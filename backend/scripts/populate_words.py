import sys
from flask import Flask
from config import Config
from database import db, init_db
from models import Word, User

app = Flask(__name__)
app.config.from_object(Config)
init_db(app)

def load_words(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        words = [line.strip() for line in file.readlines() if 3 <= len(line.strip()) <= 10 and '-' not in line]
    return words

def populate_database(file_path):
    with app.app_context():
        admin = User.query.filter_by(username="admin").first()
        if not admin:
            admin = User(username="admin", role="ADMIN")
            db.session.add(admin)
            db.session.commit()

        words = load_words(file_path)
        for word in words:
            if not Word.query.filter_by(word=word).first():
                new_word = Word(word=word, length=len(word), added_by=admin.id)
                db.session.add(new_word)

        db.session.commit()
        print(f"Added {len(words)} words to the database.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python populate_words.py <path_to_word_file>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    populate_database(file_path)
