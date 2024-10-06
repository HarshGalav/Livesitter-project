import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import OverlayEditor from './components/OverlayEditor';
import OverlayList from './components/OverlayList';

import VideoFeed from "./VideoFeed";

import axios from 'axios';
import './styles.css';
import './App.css'; // Add this line to import the new CSS file

function App() {
    const [overlays, setOverlays] = useState([]);

    const fetchOverlays = async () => {
        const response = await axios.get('http://localhost:5000/api/overlays');
        setOverlays(response.data);
    }

    useEffect(() => {
        fetchOverlays();
    }, []);

    // Replace with your RTSPtoWeb HLS URL
    const hlsUrl = 'http://localhost:8083/stream/pattern/channel/0/hls/live/index.m3u8';

    return (
        <div className="App">
            <header className="app-header">
                <h1>Livestream Application</h1>
            </header>
            <main className="app-main">
                <div className="video-container">
                    {/* <VideoPlayer src={hlsUrl} overlays={overlays} /> */}
                    <VideoFeed src="http://localhost:8083/stream/pattern/channel/0/hls/live/index.m3u8" overlays={overlays} />
                </div>
                <div className="controls">
                    <OverlayEditor fetchOverlays={fetchOverlays} />
                    <OverlayList overlays={overlays} fetchOverlays={fetchOverlays} />
                </div>
            </main>
        </div>
    );
}

export default App;
