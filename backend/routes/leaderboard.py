from flask import Blueprint, jsonify, request
from database import db
from models import Leaderboard, User
from utils import get_latest_season

leaderboard_bp = Blueprint('leaderboard', __name__, url_prefix='/api/leaderboard')


@leaderboard_bp.route('/latest', methods=['GET'])
def get_latest_top_players():
    season_id = get_latest_season()
    if not season_id:
        return jsonify({"error": "No seasons found"}), 404
    return get_top_players(season_id)


@leaderboard_bp.route('/latest/<int:user_id>', methods=['GET'])
def get_latest_user_rank(user_id):
    season_id = get_latest_season()
    if not season_id:
        return jsonify({"error": "No seasons found"}), 404
    return get_user_rank(user_id, season_id)


@leaderboard_bp.route('/', methods=['GET'])
def get_top_players(season_id=None):
    season_id = season_id or request.args.get('season_id', type=int)
    if not season_id:
        return jsonify({"error": "season_id is required"}), 400

    top_players = (
        db.session.query(Leaderboard.user_id, User.username, Leaderboard.words_guessed)
        .join(User, User.id == Leaderboard.user_id)
        .filter(Leaderboard.season_id == season_id)
        .order_by(Leaderboard.words_guessed.desc())
        .limit(100)
        .all()
    )

    result = [
        {"rank": idx + 1, "user_id": user_id, "username": username, "words_guessed": words_guessed}
        for idx, (user_id, username, words_guessed) in enumerate(top_players)
    ]

    return jsonify({"season_id": season_id, "leaderboard": result})


@leaderboard_bp.route('/<int:user_id>', methods=['GET'])
def get_user_rank(user_id, season_id=None):
    season_id = season_id or request.args.get('season_id', type=int)
    if not season_id:
        return jsonify({"error": "season_id is required"}), 400

    ranks = (
        db.session.query(Leaderboard.user_id, Leaderboard.words_guessed)
        .filter(Leaderboard.season_id == season_id)
        .order_by(Leaderboard.words_guessed.desc())
        .all()
    )

    user_rank = next((idx + 1 for idx, (uid, _) in enumerate(ranks) if uid == user_id), None)

    if user_rank is None:
        return jsonify({"error": "User not found in leaderboard for this season"}), 404

    return jsonify({"user_id": user_id, "rank": user_rank, "season_id": season_id})