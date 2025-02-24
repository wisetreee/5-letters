class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://user:password@localhost/wordle_db' # TODO: скрыть URI в .env
    SQLALCHEMY_TRACK_MODIFICATIONS = False
