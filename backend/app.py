from flask import Flask
from database import init_db, db
from routes.core import game_bp
from flask_migrate import Migrate
from scheduler import start_scheduler
from flask_cors import CORS

app = Flask(__name__)
init_db(app)
CORS(app)

migrate = Migrate(app, db)

start_scheduler()

app.register_blueprint(game_bp)

if __name__ == '__main__':
    app.run(debug=True)
