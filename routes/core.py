from flask import Blueprint, request, jsonify
from database import db
from models import GameSession, Word

game_bp = Blueprint('game', __name__)

ATTEMPTS_BY_LENGTH = {3: 7, 4: 6, 5: 6, 6: 5, 7: 5, 8: 4, 9: 4, 10: 3}

@game_bp.route('/game/start', methods=['GET'])
def start_game():
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400
    
    word = Word.query.order_by(db.func.random()).first()
    if not word:
        return jsonify({'error': 'No words available'}), 500
    
    attempts = ATTEMPTS_BY_LENGTH.get(len(word.word), 3)
    
    session = GameSession(user_id=user_id, word_id=word.id, attempts_left=attempts, completed=False)
    db.session.add(session)
    db.session.commit()
    
    return jsonify({'game_id': session.id, 'word_length': len(word.word), 'attempts_left': attempts})

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
    
    if guess == word.word:
        session.completed = True
        db.session.commit()
        return jsonify({'result': 'win', 'attempts_used': ATTEMPTS_BY_LENGTH[len(word.word)] - session.attempts_left + 1})
    
    session.attempts_left -= 1
    if session.attempts_left <= 0:
        session.completed = True
        db.session.commit()
        return jsonify({'result': 'lose', 'correct_word': word.word})
    
    db.session.commit()
    return jsonify({'result': 'incorrect', 'attempts_left': session.attempts_left})
