import { useState, useRef } from "react";
import vespucioMp3 from "../assets/mp3/01 - Vespucio.mp3";

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const width = progressBar.clientWidth;
    const newTime = (clickPosition / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={vespucioMp3}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="player-card">
      <h3 className="section-title cyan">🎧 ESCUCHA VESPUCIO</h3>
      <div className="music-player">
        <div className="player-visualizer">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className="player-controls">
          <button className="control-btn">⏮</button>
          <button className="control-btn play" onClick={togglePlay}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button className="control-btn">⏭</button>
          <button className="control-btn">🔊</button>
        </div>

        <div className="track-info">
          <span className="track-name"> LUZ FIJA - VESPUCIO </span>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div
              className="progress"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <div className="time-info">
            <span className="time">{formatTime(currentTime)}</span>
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="winamp-visual">
          <span>═◄ WINAMP ►═</span>
          <div className="equalizer">
            <span>🎵</span>
            <span>🎶</span>
            <span>🎵</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default MusicPlayer;
