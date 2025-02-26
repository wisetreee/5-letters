from dotenv import load_dotenv
from os import getenv

load_dotenv()
URI = getenv("URI")

class Config:
    SQLALCHEMY_DATABASE_URI = URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False
