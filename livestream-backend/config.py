import os

class Config:
    MONGO_URI = os.environ.get("mongodb+srv://harshsharma3122:<KrKYV4NhWgyJTFJA>@cluster0.r8zmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", "mongodb://localhost:27017/livestream_db")
