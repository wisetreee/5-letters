from flask import Blueprint, request, jsonify
from database import db
from models import GameSession, Word, Leaderboard, User
from urllib.parse import parse_qs
from utils import get_latest_season, calculate_rank_for_all
from os import getenv
from dotenv import load_dotenv
from datetime import datetime, timedelta
from game_model import GameModel, GameType
import json
import hashlib
import hmac

load_dotenv()

game_bp = Blueprint('game', __name__, url_prefix='/api/game')


def verify_telegram_webapp_data(init_data):
    """
    Проверяет подпись данных от Telegram WebApp
    """
    try:
        parsed_data = parse_qs(init_data)
        hash_str = parsed_data.pop('hash', [None])[0]
        if not hash_str:
            return False

        auth_date = int(parsed_data.get('auth_date', ['0'])[0])
        if (datetime.now() - datetime.fromtimestamp(auth_date)) > timedelta(hours=24):
            return jsonify({'error': 'Data expired'}), 400

        data_check_string = '\n'.join(
            f"{key}={value[0]}" 
            for key, value in sorted(parsed_data.items())
        )

        secret_key = hashlib.sha256(getenv('TOKEN').encode()).digest()
        
        computed_hash = hmac.new(
            secret_key, 
            data_check_string.encode(), 
            hashlib.sha256
        ).hexdigest()

        return computed_hash == hash_str
    except Exception as e:
        print(f"Error verifying Telegram data: {e}")
        return False

@game_bp.route('/auth', methods=['POST'])
def authenticate():
    init_data = request.get_json().get('initData')
    if not init_data:
        return jsonify({'error': 'Missing initData'}), 400

    # if not verify_telegram_webapp_data(init_data):
    #     return jsonify({'error': 'Invalid Telegram data signature'}), 403

    try:
        data = parse_qs(init_data)
        user_data = json.loads(data["user"][0])
        user_id = user_data['id']
        username = user_data.get('username', '')
        first_name = user_data.get('first_name', '')
        photo_url = user_data.get('photo_url', '')

        user = User.query.filter_by(user_id=user_id).first()
        
        if not user:
            user_count = db.session.query(db.func.count(User.id)).scalar()

            user = User(
                user_id=user_id,
                username=username or first_name,
                photo_url=photo_url,
                role='USER',
                rank=user_count + 1
            )
            db.session.add(user)
            db.session.commit()

            latest_season = get_latest_season()
            if latest_season:
                leaderboard_entry = Leaderboard(
                    user_id=user_id,
                    season_id=latest_season.id,
                    words_guessed=0
                )
                db.session.add(leaderboard_entry)
                db.session.commit()

        response = {
            'user': {
                'id': user.id,
                'user_id': user.user_id,
                'username': user.username,
                'photo_url': user.photo_url,
                'role': user.role,
                'star_balance': user.star_balance
            },
            'auth_data': {
                'auth_date': data.get('auth_date', [''])[0],
                'query_id': data.get('query_id', [''])[0]
            }
        }

        return jsonify(response), 200

    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid user data format'}), 400
    except KeyError as e:
        return jsonify({'error': f'Missing required field: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


@game_bp.route('/daily', methods=['GET'])
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

    game_model = GameModel()
    attempts = game_model.ATTEMPTS_BY_LENGTH.get(daily_word.length, 3)

    session = GameSession(user_id=user_id, word_id=daily_word.id, attempts_left=attempts, reward=game_model.get_reward_by_mode(GameType.DAILY), completed=False)
    db.session.add(session)
    db.session.commit()

    return jsonify({
        'game_id': session.id,
        'word_length': daily_word.length,
        'attempts_left': attempts,
        'reward': session.reward,
    })

@game_bp.route('/start', methods=['GET'])
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

    game_model = GameModel()
    attempts = game_model.ATTEMPTS_BY_LENGTH.get(word.length, 3)

    session = GameSession(user_id=user_id, word_id=word.id, attempts_left=attempts, completed=False, reward=game_model.get_reward_by_mode(GameType.ENDLESS))
    db.session.add(session)
    db.session.commit()

    return jsonify(
        {
          'game_id': session.id, 
          'word_length': word.length, 
          'attempts_left': attempts,
          'reward': session.reward
        })


@game_bp.route('/guess', methods=['POST'])
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
    session.completed = session.attempts_left <= 0 or guess == correct_word

    if guess == correct_word:
        winner = User.query.filter_by(user_id=session.user_id).first()
        winner.star_balance += session.reward
        leaderboard_entry = Leaderboard.query.filter_by(user_id=session.user_id, season_id=get_latest_season()).first()
        if leaderboard_entry:
            leaderboard_entry.words_guessed += 1
        else:
            leaderboard_entry = Leaderboard(user_id=session.user_id, season_id=get_latest_season(), words_guessed=1)
            db.session.add(leaderboard_entry)

        db.session.commit()

        calculate_rank_for_all()
        db.session.commit()
        
        game_model = GameModel()

        return jsonify({
            'result': 'win',
            'feedback': result,
            'attempts_used': game_model.ATTEMPTS_BY_LENGTH.get(len(word.word), 3) - session.attempts_left,
            'reward': session.reward
        })

    if session.attempts_left <= 0:
        db.session.commit()
        return jsonify({'result': 'lose', 'correct_word': correct_word, 'feedback': result})

    db.session.commit()
    return jsonify({'result': 'incorrect', 'feedback': result})

