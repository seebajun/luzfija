import { useState, useRef, useEffect } from "react";
import vespucioMp3 from "../../assets/mp3/01 - Vespucio.mp3";
import pactoMp3 from "../../assets/mp3/02 - Pacto.mp3";
import gifReproductor01 from "../../assets/GIF/gif_reproductor01.gif";
import gifReproductor02 from "../../assets/GIF/gif_reproductor02.gif";
import gifReproductor03 from "../../assets/GIF/gif_reproductor03.gif";
import gifReproductor04 from "../../assets/GIF/gif_reproductor04.gif";
import gifReproductor05 from "../../assets/GIF/gif_reproductor05.gif";
import "./MusicPlayer.css";

const TRACKS = [
  {
    id: "vespucio",
    label: "VESPUCIO",
    title: "LUZ FIJA — VESPUCIO",
    src: vespucioMp3,
  },
  { id: "pacto", label: "PACTO", title: "LUZ FIJA — PACTO", src: pactoMp3 },
];

const DEFAULT_TRACK_INDEX = TRACKS.findIndex((t) => t.id === "pacto");

function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(
    DEFAULT_TRACK_INDEX === -1 ? 0 : DEFAULT_TRACK_INDEX,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);
  const keepPlayingRef = useRef(false);
  const volumeRef = useRef(0.7);
  const isFirstRun = useRef(true);
  const track = TRACKS[trackIndex];

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (keepPlayingRef.current) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(false);
    }
  }, [trackIndex]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volumeRef.current;
  }, []);

  const selectTrack = (nextIndex) => {
    const next = (nextIndex + TRACKS.length) % TRACKS.length;
    if (next === trackIndex) return;
    keepPlayingRef.current = isPlaying;
    setCurrentTime(0);
    setDuration(0);
    setTrackIndex(next);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = volumeRef.current;
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolChange = (e) => {
    const val = parseFloat(e.target.value);
    volumeRef.current = val;
    setVolume(val);
    audioRef.current.volume = val;
    if (val > 0) audioRef.current.muted = false;
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
        src={track.src}
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="winamp-player">
        <img className="winamp-gif winamp-gif-left" src={gifReproductor01} alt="" />
        <img className="winamp-gif winamp-gif-left-center" src={gifReproductor02} alt="" />
        <img className="winamp-gif winamp-gif-center" src={gifReproductor03} alt="" />
        <img className="winamp-gif winamp-gif-right-center" src={gifReproductor04} alt="" />
        <img className="winamp-gif winamp-gif-right" src={gifReproductor05} alt="" />
        <div className="wa-playlist">
          {TRACKS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              className={`wa-track${i === trackIndex ? " active" : ""}`}
              onClick={() => selectTrack(i)}
              aria-pressed={i === trackIndex}
            >
              {String(i + 1).padStart(2, "0")} {t.label}
            </button>
          ))}
        </div>
        <div className="wa-led">
          <div className="wa-eq">
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
          </div>
          <span className="wa-led-track">{track.title}</span>
          <span className="wa-led-time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="wa-row">
          <div className="wa-btns">
            <button
              className="wa-btn"
              onClick={() => selectTrack(trackIndex - 1)}
              aria-label="Canción anterior"
            >
              ⏮
            </button>
            <button className="wa-btn wa-play" onClick={togglePlay}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button
              className="wa-btn"
              onClick={() => selectTrack(trackIndex + 1)}
              aria-label="Canción siguiente"
            >
              ⏭
            </button>
            <span className="wa-vol-icon">{volume === 0 ? "🔇" : "🔊"}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolChange}
              className="wa-volume-slider"
            />
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
