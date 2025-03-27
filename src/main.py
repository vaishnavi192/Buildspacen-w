from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

# FastAPI application setup
app = FastAPI()

# Load Hugging Face sentiment analysis model
sentiment_analyzer = pipeline("sentiment-analysis")

# Sample song data (You can replace this with real song data or fetch from an API)
songs = [
    {"title": "Happy Song", "artist": "Artist A", "mood": "happy"},
    {"title": "Sad Song", "artist": "Artist B", "mood": "sad"},
    {"title": "Energetic Song", "artist": "Artist C", "mood": "energetic"},
    {"title": "Relaxing Song", "artist": "Artist D", "mood": "relaxed"},
    {"title": "Angry Song", "artist": "Artist E", "mood": "angry"}
]

class Query(BaseModel):
    text: str

@app.post("/get-songs-by-emotion")
async def get_songs_by_emotion(query: Query):
    # Perform sentiment analysis on the user's query text
    result = sentiment_analyzer(query.text)

    # Extract sentiment result
    sentiment = result[0]['label'].lower()

    # Filter songs based on the sentiment
    if sentiment == 'positive':
        recommended_songs = [song for song in songs if song['mood'] in ['happy', 'energetic', 'relaxed']]
    elif sentiment == 'negative':
        recommended_songs = [song for song in songs if song['mood'] in ['sad', 'angry']]
    else:
        recommended_songs = songs  # Neutral or no sentiment, return all songs

    return {"sentiment": sentiment, "recommended_songs": recommended_songs}
