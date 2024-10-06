import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ src, overlays }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                autoplay: false,
                preload: 'auto',
                sources: [{
                    src: src,
                    type: 'application/x-mpegURL'
                }]
            });

            return () => {
                if (playerRef.current) {
                    playerRef.current.dispose();
                }
            };
        }
    }, [src]);

    return (
        <div className="video-container" style={{ position: 'relative' }}>
            <video ref={videoRef} className="video-js vjs-default-skin" />
            {overlays.map((overlay) => (
                <div
                    key={overlay.id}
                    style={{
                        position: 'absolute',
                        top: overlay.position.y,
                        left: overlay.position.x,
                        width: overlay.size.width,
                        height: overlay.size.height,
                        pointerEvents: 'none',
                        zIndex: 10
                    }}
                >
                    {overlay.type === 'text' ? (
                        <span style={{ color: overlay.color || '#FFF' }}>{overlay.content}</span>
                    ) : (
                        <img src={overlay.content} alt="Overlay" style={{ width: '100%', height: '100%' }} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default VideoPlayer;
