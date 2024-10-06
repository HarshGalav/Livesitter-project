import React from 'react';
import { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";
import styled from 'styled-components';

const VideoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: auto;
`;

const VideoFeed = ({ src, overlays }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const vjsPlayer = videojs(videoElement, {
        fluid: true,
        responsive: true,
        aspectRatio: '16:9',
      }, () => {
        console.log("player is ready");
      });

      setPlayer(vjsPlayer);
    }
  }, [videoRef, player]);

  useEffect(() => {
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [player]);

  return (
    <VideoContainer>
      <VideoPlayer className="video-js" ref={videoRef} controls>
        <source src={src} type="application/x-mpegURL" />
      </VideoPlayer>
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
    </VideoContainer>
  );
};

export default VideoFeed;
