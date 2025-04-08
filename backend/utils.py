from database import db
from models import Season
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