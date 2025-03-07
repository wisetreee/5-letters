from flask import Flask
from backend.database import init_db
from backend.routes.core import game_bp

app = Flask(__name__)
init_db(app)

app.register_blueprint(game_bp)

if __name__ == '__main__':
    app.run(debug=True)
