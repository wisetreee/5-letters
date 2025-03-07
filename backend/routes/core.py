from flask import Blueprint, request, jsonify
from backend.database import db
from backend.models import GameSession, Word

game_bp = Blueprint('game', __name__)

ATTEMPTS_BY_LENGTH = {3: 7, 4: 6, 5: 6, 6: 5, 7: 5, 8: 4, 9: 4, 10: 3}

@game_bp.route('/game/daily', methods=['GET'])
def get_daily_word():
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    daily_word = Word.query.filter_by(daily=True).order_by(Word.updated_at.desc()).first()

    if not daily_word:
        return jsonify({'error': 'No daily word available'}), 404

    previous_session = GameSession.query.filter_by(user_id=user_id, word_id=daily_word.id, completed=True).first()
    if previous_session:
        return jsonify({'error': 'You have already played with the daily word.'}), 400

    existing_session = GameSession.query.filter_by(user_id=user_id, word_id=daily_word.id, completed=False).first()
    if existing_session:
        return jsonify({'message': 'You already have an active game with the daily word.'}), 400

    existing_sessions = GameSession.query.filter_by(user_id=user_id, completed=False).all()
    for session in existing_sessions:
        db.session.delete(session)
    db.session.commit()

    attempts = ATTEMPTS_BY_LENGTH.get(daily_word.length, 3)

    session = GameSession(user_id=user_id, word_id=daily_word.id, attempts_left=attempts, completed=False)
    db.session.add(session)
    db.session.commit()

    return jsonify({
        'game_id': session.id,
        'word_length': daily_word.length,
        'attempts_left': attempts
    })

@game_bp.route('/game/start', methods=['GET'])
def start_game():
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    existing_session = GameSession.query.filter_by(user_id=user_id, completed=False).all()
    if existing_session:
        for item in existing_session:
            db.session.delete(item)
        db.session.commit()

    word = Word.query.order_by(db.text('random()')).first()
    if not word:
        return jsonify({'error': 'No words available'}), 500

    attempts = ATTEMPTS_BY_LENGTH.get(word.length, 3)

    session = GameSession(user_id=user_id, word_id=word.id, attempts_left=attempts, completed=False)
    db.session.add(session)
    db.session.commit()

    return jsonify({'game_id': session.id, 'word_length': word.length, 'attempts_left': attempts})


@game_bp.route('/game/guess', methods=['POST'])
def guess_word():
    data = request.json
    game_id = data.get('game_id')
    guess = data.get('guess')

    session = GameSession.query.get(game_id)
    if not session or session.completed:
        return jsonify({'error': 'Invalid or completed game session'}), 400

    word = Word.query.get(session.word_id)
    if not word:
        return jsonify({'error': 'Word not found'}), 500

    correct_word = word.word.lower()
    guess = guess.lower()

    if len(guess) != len(correct_word):
        return jsonify({'error': 'Incorrect word length'}), 400

    result = []
    correct_letters = list(correct_word)
    guessed_letters = list(guess)

    for i in range(len(correct_word)):
        if guessed_letters[i] == correct_letters[i]:
            result.append('correct')  
            correct_letters[i] = None  
        else:
            result.append(None)

    for i in range(len(correct_word)):
        if result[i] is None: 
            if guessed_letters[i] in correct_letters:
                result[i] = 'present' 
                correct_letters[correct_letters.index(guessed_letters[i])] = None
            else:
                result[i] = 'absent'

    session.attempts_left -= 1
    if guess == correct_word:
        session.completed = True
        db.session.commit()
        return jsonify({'result': 'win', 'feedback': result, 'attempts_used': ATTEMPTS_BY_LENGTH.get(len(word.word), 3) - session.attempts_left})

    if session.attempts_left <= 0:
        session.completed = True
        db.session.commit()
        return jsonify({'result': 'lose', 'correct_word': correct_word, 'feedback': result})

    db.session.commit()
    return jsonify({'result': 'incorrect', 'attempts_left': session.attempts_left, 'feedback': result})

