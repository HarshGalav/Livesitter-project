from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)
db = client.livestream_db
overlays = db.overlays
