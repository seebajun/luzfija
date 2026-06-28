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
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickPosition / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
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
      <div className="winamp-player">
        <div className="winamp-left">
          <div className="winamp-Equalizer">
            <div className="eq-bar" style={{ animationDelay: "0s" }}></div>
            <div className="eq-bar" style={{ animationDelay: "0.15s" }}></div>
            <div className="eq-bar" style={{ animationDelay: "0.3s" }}></div>
            <div className="eq-bar" style={{ animationDelay: "0.1s" }}></div>
            <div className="eq-bar" style={{ animationDelay: "0.25s" }}></div>
          </div>
        </div>

        <div className="winamp-controls">
          <button className="wa-btn">⏮</button>
          <button className="wa-btn wa-play" onClick={togglePlay}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button className="wa-btn">⏭</button>
          <button className="wa-btn">🔊</button>
        </div>

        <div className="winamp-info">
          <span className="wa-track">LUZ FIJA — VESPUCIO</span>
        </div>

        <div className="winamp-progress-wrap">
          <div className="wa-progress-bar" onClick={handleProgressClick}>
            <div
              className="wa-progress"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="wa-time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
