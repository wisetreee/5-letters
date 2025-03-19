from backend.database import db
from backend.models import Season
from sqlalchemy import desc


def get_latest_season():
    latest_season = (
        db.session.query(Season.id)
        .order_by(desc(Season.start_date))
        .first()
    )
    return latest_season.id if latest_season else None