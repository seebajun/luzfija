import { useState, useRef } from "react";
import vespucioMp3 from "../assets/mp3/01 - Vespucio.mp3";

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
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
        <div className="wa-led">
          <div className="wa-eq">
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
          </div>
          <span className="wa-led-track">LUZ FIJA — VESPUCIO</span>
          <span className="wa-led-time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="wa-row">
          <div className="wa-btns">
            <button className="wa-btn">⏮</button>
            <button className="wa-btn wa-play" onClick={togglePlay}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="wa-btn">⏭</button>
            <button className="wa-btn" onClick={toggleMute}>{isMuted ? "🔇" : "🔊"}</button>
          </div>
          <div className="wa-progress-wrap">
            <div className="wa-progress-bar" onClick={handleProgressClick}>
              <div
                className="wa-progress"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
