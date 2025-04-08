from flask import Flask
from database import init_db, db
from routes.core import game_bp
from flask_migrate import Migrate
from scheduler import start_scheduler
from flask_cors import CORS
from populate_words import populate_database
app = Flask(__name__)
init_db(app)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

migrate = Migrate(app, db)

start_scheduler()

app.register_blueprint(game_bp)

if __name__ == '__main__':
    populate_database("raw words.txt", app)
    app.run(host="0.0.0.0", port=5000, debug=True)
