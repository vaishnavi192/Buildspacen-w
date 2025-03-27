import {useState} from 'react'
import './cards.css'
import SentimentSearch from './SentimentSearch';
<SentimentSearch />
function Cards() {
    const [keyword, setKeyword] = useState("")
    const [tracks, setTracks] = useState([])
    const [sentiment, setSentiment] = useState("");
    const [songs, setSongs] = useState([]);
    const getTracks = async () => {
        let data = await fetch(`https://v1.nocodeapi.com/vaishnavi19/spotify/iRowyBPHESJTCios/search?q=${keyword}&type=track`);
        let convertedData = await data.json();
        setTracks(convertedData.tracks.items);
      };
    
      return (
        <>
          <div className="d-flex flex-column justify-content-center align-items-center bg-custom" style={{ height: '30vh' }}>
            <h1 style={{ paddingBottom: '20px', color: 'white' }}>From "uff" to "Ahaa" - Uncover the ideal soundtrack for editing videos!</h1>
            <div className="input-group mb-3" style={{ maxWidth: '1000px' }}>
              <input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                style={{ height: '70px', fontSize: '20px' }}
              />
              <div className="input-group-append">
                <button onClick={getTracks} className="btn btn-outline-secondary" type="button" style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                  Search Tracks
                </button>
              </div>
            </div>
            <h3>Sentiment: {sentiment}</h3>
            <ul>
              {songs.map((song, index) => (
                <li key={index}>
                  {song.title} by {song.artist}
                </li>
              ))}
            </ul>
          </div>
    
          <SentimentAnalysis setSentiment={setSentiment} setSongs={setSongs} /> {/* Add Sentiment Analysis component here */}
    
          <div className="container cards-container" style={{ marginTop: '20px' }}>
            {tracks.map((element) => (
              <div className="row" key={element.id}>
                <div className="col-12">
                  <div className="card mb-3" style={{ maxWidth: '100%' }}>
                    <div className="d-flex align-items-center" style={{ gap: '10px', padding: '10px' }}>
                      <img
                        src={element.album.images[0]?.url}
                        className="img-fluid rounded-start"
                        alt={`${element.name} album cover`}
                        style={{ maxWidth: '100%', maxHeight: '80px' }}
                      />
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <h5 className="card-title truncate" style={{ marginBottom: '0' }}>{element.name}</h5>
                        <p className="card-text truncate" style={{ marginBottom: '0' }}>Artist: {element.album.artists[0].name}</p>
                      </div>
                      <audio src={element.preview_url} controls style={{ maxWidth: '100%' }}></audio>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }
    
    export default Cards;

