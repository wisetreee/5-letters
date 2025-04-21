from database import db
from models import Season, User
from datetime import datetime, timedelta
from sqlalchemy import desc


def get_latest_season():
    latest_season = (
        db.session.query(Season)
        .order_by(desc(Season.start_date))
        .first()
    )
    
    if latest_season:
        return latest_season.id
    
    now = datetime.now()
    new_season = Season(
        start_date=now,
        end_date=now + timedelta(days=30)
    )
    
    db.session.add(new_season)

    try:
        db.session.commit()

        return new_season.id
    except Exception as e:
        db.session.rollback()
        
        raise Exception(f"Failed to create new season: {str(e)}")


def calculate_rank_for_all():
    users = User.query.order_by(User.star_balance.desc()).all()

    for idx, user in enumerate(users, start=1):
        user.rank = idx

    db.session.commit()

def drop_user_stats_by_new_season():
    users = db.session.query(User).all()

    for idx, user in enumerate(users, start=1):
        user.rank = idx
        user.star_balance = 0
    
    db.session.commit()