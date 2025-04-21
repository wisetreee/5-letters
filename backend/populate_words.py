import logging
from database import db
from models import Word, User

logging.basicConfig(level=logging.INFO)

def load_words(file_path):
    try:
        with open(file_path, 'r', encoding='cp1251') as file:
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
            admin = User(username="admin", role="ADMIN", user_id = 1, photo_url="", star_balance=0, rank=1)
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