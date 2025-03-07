import sys
import logging
from flask import Flask
from config import Config
from database import db, init_db
from models import Word, User
import os

app = Flask(__name__)
app.config.from_object(Config)
init_db(app)

logging.basicConfig(level=logging.INFO)

def load_words(file_path):
    with open(file_path, 'r', encoding='cp1251') as file:
        words = [line.strip() for line in file.readlines() if 3 <= len(line.strip()) <= 10 and '-' not in line]
    logging.info(f"Loaded {len(words)} valid words from {file_path}.")
    return words

def populate_database(file_path):
    with app.app_context():
        admin = User.query.filter_by(username="admin").first()
        if not admin:
            admin = User(username="admin", role="ADMIN")
            db.session.add(admin)
            db.session.commit()
            logging.info(f"Created 'admin' user with ID {admin.id}.")
        else:
            logging.info(f"Found existing 'admin' user with ID {admin.id}.")

        words = load_words(file_path)
        added_count = 0
        for word in words:
            if not Word.query.filter_by(word=word).first():
                new_word = Word(word=word, length=len(word), added_by=admin.id)
                db.session.add(new_word)
                added_count += 1

        if added_count > 0:
            db.session.commit()
            logging.info(f"Successfully added {added_count} words to the database.")
        else:
            logging.info("No new words to add.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python populate_words.py <path_to_word_file>")
        sys.exit(1)
    
    file_path = sys.argv[1]

    if not os.path.exists(file_path):
        print(f"Error: File '{file_path}' not found.")
        sys.exit(1)

    populate_database(file_path)
