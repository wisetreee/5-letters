from flask import Blueprint, jsonify
from database import db
from models import User, Season
from game_model import GameModel, GameType
from utils import get_latest_season, calculate_rank_for_all
from sqlalchemy import desc


game_bp = Blueprint('model', __name__, url_prefix='/api/model')

@game_bp.route('/<int:user_id>', methods=['GET'])
def get_data(user_id):
    latest_season = get_latest_season()
    season = db.session.query(Season).order_by(desc(Season.start_date)).first()
    season_end = season.end_date.strftime('%d:%H:%M')
    game_model = GameModel()

    calculate_rank_for_all()

    user = db.session.query(User).filter_by(user_id=user_id).first()

    if not user:
        return jsonify(
            error='user_id doesnt exist',
            code=404
        )

    return {
        'season': {
            'id': latest_season,
            'remaining_time': season_end
        },
        'rewards': {
            'daily': game_model.get_reward_by_mode(GameType.DAILY),
            'endless': game_model.get_reward_by_mode(GameType.ENDLESS)
        },
        'rank': user.rank
    }