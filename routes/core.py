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
