import logging
from database import db
from models import Word, User
import random
from utils import calculate_rank_for_all

logging.basicConfig(level=logging.INFO)

def load_words(file_path):
    try:
        with open(file_path, 'r') as file:
            words = [line.strip() for line in file.readlines() if 3 <= len(line.strip()) <= 10 and '-' not in line]
        logging.info(f"Loaded {len(words)} valid words from {file_path}.")
        return words
    except FileNotFoundError:
        logging.error(f"File {file_path} not found!")
        return []
    except UnicodeDecodeError:
        logging.error(f"Failed to decode {file_path} with cp1251 encoding!")
        return []

def populate_database(file_path, app):
    with app.app_context():
        if Word.query.first():
            logging.info("Database already contains words. Skipping populate.")
            return
        admin = User.query.filter_by(role="ADMIN").first()
        if not admin:
            admin = User(username="admin", role="ADMIN", user_id = 1, photo_url="", star_balance=0, rank=0)
            db.session.add(admin)
            db.session.commit()
            logging.info(f"Created 'admin' user with ID {admin.id}.")
        else:
            logging.info(f"Found existing 'admin' user with ID {admin.id}.")

        words = load_words(file_path)
        added_count = 0

        db_words = Word.query.all()
        # s_words = [word.word for word in db_words]

        for word in words:
            exists = Word.query.filter_by(word=word).first()
            if not exists:
                new_word = Word(word=word, length=len(word), added_by=admin.id)
                db.session.add(new_word)
                added_count += 1

        if added_count > 0:
            db.session.commit()
            logging.info(f"Successfully added {added_count} words to the database.")
        else:
            logging.info("No new words to add.")

def generate_mock_users(app, n=50):

    with app.app_context():
        existing_users_count = User.query.count()
        
        if existing_users_count >= n:
            print(f'{existing_users_count} users already exist — skipping mock generation.')
            return
        
        users_to_create = n - existing_users_count
        existing_user_ids = {u.user_id for u in User.query.all()}

        for _ in range(users_to_create):
            user_id = random.randint(10000, 99999)
            while user_id in existing_user_ids:
                user_id = random.randint(10000, 99999)
            existing_user_ids.add(user_id)

            user = User(
                user_id=user_id,
                username="mock_user_" + str(user_id),
                photo_url="",
                role='USER',
                star_balance=random.randint(0, 500),
                rank=0
            )
            db.session.add(user)

        db.session.commit()
        calculate_rank_for_all()
        print(f'Added {users_to_create} mock users and updated ranks.')