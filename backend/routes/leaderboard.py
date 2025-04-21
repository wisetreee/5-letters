from flask import Blueprint, jsonify, request
from models import User
from sqlalchemy import and_

leaderboard_bp = Blueprint('leaderboard', __name__, url_prefix='/api/leaderboard')

@leaderboard_bp.route('/')
def get_leaderboard_by_rank():
    user_id = request.args.get('user_id', type=int)
    start_rank = request.args.get('start_rank', type=int)
    count = request.args.get('count', type=int)

    if not user_id or not start_rank or not count:
        return jsonify(
            error="query params doesnt correspond to correct params",
            code=404
        )

    users = User.query.filter(
        and_(
            User.rank >= start_rank,
            User.rank < start_rank + count
        )
    ).order_by(User.rank).all()

    leaderboard = [
        {
            "user_id": user.user_id,
            "username": user.username,
            "photo_url": user.photo_url,
            "rank": user.rank,
            "star_balance": user.star_balance
        }
        for user in users
    ]

    current_user = None

    if user_id:
        current_user = User.query.filter_by(user_id=user_id).first()
    
    user_output = None

    if current_user:
        user_output = {
            "user_id": current_user.user_id,
            "username": current_user.username,
            "photo_url": current_user.photo_url,
            "rank": current_user.rank,
            "star_balance": current_user.star_balance
        }
    
    return jsonify({
        "leaderboard": leaderboard,
        "current_user": user_output,
    })