from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from database import db
from models import Word

def select_daily_word():
    word = Word.query.filter_by(daily=False).order_by(db.func.random()).first()

    if word:
        word.daily = True
        word.updated_at = datetime.utc().date()

        db.session.commit()

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(select_daily_word, 'interval', days=1, id='daily_word', start_date=datetime.now())
    scheduler.start()
