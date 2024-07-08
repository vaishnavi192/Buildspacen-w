import React, { useState, useEffect, useRef } from 'react';
import './cards.css';

function CustomAudioPlayer({ src }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', setAudioData);
        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', setAudioData);
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const updateProgress = () => {
        const { currentTime, duration } = audioRef.current;
        const progressPercent = (currentTime / duration) * 100;
        setProgress(progressPercent);
        setCurrentTime(formatTime(currentTime));
    };

    const setAudioData = () => {
        setDuration(formatTime(audioRef.current.duration));
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const seek = (e) => {
        const audio = audioRef.current;
        const progressBar = e.currentTarget;
        const clickPosition = (e.pageX - progressBar.offsetLeft) / progressBar.offsetWidth;
        audio.currentTime = clickPosition * audio.duration;
    };

    return (
        <div className="custom-audio-player">
            <audio ref={audioRef} src={src} />
            <div className="play-pause-btn" onClick={togglePlay}>
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </div>
            <div className="progress-bar" onClick={seek}>
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="time">{currentTime} / {duration}</div>
        </div>
    );
}

function Cards() {
    const [keyword, setKeyword] = useState("");
    const [tracks, setTracks] = useState([]);

    const getTracks = async () => {
        try {
            const response = await fetch(`https://v1.nocodeapi.com/sample1/spotify/wGWHnPaWAvsKbTRW/search?q=${keyword}&type=track&limit=10`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const convertedData = await response.json();
            if (convertedData.tracks && Array.isArray(convertedData.tracks.items)) {
                setTracks(convertedData.tracks.items);
            } else {
                console.error('Unexpected data structure:', convertedData);
                setTracks([]); 
            }
        } catch (error) {
            console.error('Error fetching tracks:', error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        getTracks();
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <div className="search-container">
                <h1 className="search-title">From "uff" to "ahaa"- Uncover the ideal soundtrack for editing videos!</h1>
                <form onSubmit={handleSubmit} className="search-form">
                    <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        type="text"
                        className="search-input"
                        placeholder="Search for tracks..."
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
            <div className="cards-container">
            {tracks.map((track) => (
                <div className="row" key={track.id}>
                <div className="col-12 ">
                <div className="card mb-3 transparent-card" style={{ maxWidth: '100%', backgroundColor: 'transparent', border: '1px groove #6d5274'}}>
                    <div className="d-flex align-items-center" style={{ gap: '10px', padding: '10px' }}>
                    <img src={track.album.images[0]?.url} className="img-fluid rounded-start" alt={`${track.name} album cover`} style={{ maxWidth: '100%', maxHeight: '80px' }}/>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <h5 className="card-title truncate" style={{ marginBottom: '0', color:'#ffffff' }}>{track.name}</h5>
                        <p className="card-text truncate" style={{ marginBottom: '0', color:'#ffffff'}}>Artist: {track.album.artists[0].name}</p>
                        </div>
                        <div style={{ display: 'flex', backgroundColor: 'transparent',justifyContent: 'flex-end' }}>
                        <CustomAudioPlayer src={track.preview_url} />
                    </div>
                </div>
                </div>
                </div>
                </div>
               
            ))}
            </div>
        
    
        </div>
    );
}

export default Cards;