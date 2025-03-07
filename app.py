from flask import Flask
from backend.database import init_db, db
from backend.routes.core import game_bp
from flask_migrate import Migrate


app = Flask(__name__)
init_db(app)

migrate = Migrate(app, db)

app.register_blueprint(game_bp)

if __name__ == '__main__':
    app.run(debug=True)
