from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from database import db
from models import Word, Season
from utils import drop_user_stats_by_new_season


def select_daily_word():
    word = Word.query.filter_by(daily=False).order_by(db.func.random()).first()

    if word:
        word.daily = True
        word.updated_at = datetime.utc().date()

        db.session.commit()

def update_season():
    new_season = Season(
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=30)
    )

    drop_user_stats_by_new_season()

    db.session.add(new_season)
    db.session.commit()


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(select_daily_word, 'interval', days=1, id='daily_word', start_date=datetime.now())
    scheduler.add_job(update_season, 'interval', days=30, id='update_season', start_date=datetime.now())
    scheduler.start()
