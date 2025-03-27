import React, { useState } from 'react';
import axios from 'axios';

function SentimentSearch() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [sentiment, setSentiment] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/get-songs-by-emotion', { text: query });
      setSentiment(response.data.sentiment);
      setSongs(response.data.recommended_songs);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a feeling or emotion"
      />
      <button onClick={handleSearch}>Search</button>

      <h3>Sentiment: {sentiment}</h3>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            {song.title} by {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SentimentSearch;
