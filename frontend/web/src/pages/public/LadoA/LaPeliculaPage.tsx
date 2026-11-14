import { useEffect, useRef, useState } from 'react';
import pausaIcon from '../../../assets/icons/nav-bar-pause.svg';
import playIcon from '../../../assets/icons/nav-bar-play.svg';

import '../../../styles/pages/public/LadoA/la-pelicula-page.css';

const videoUrl = import.meta.env.VITE_FILM_STREAM_URL;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '00:00:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return [hours, minutes, remainingSeconds]
    .map((part) => part.toString().padStart(2, '0'))
    .join(':');
}

export default function LaPeliculaPage() {
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const updateFullscreenState = () => {
      setIsFullscreen(document.fullscreenElement === playerRef.current);
    };

    document.addEventListener('fullscreenchange', updateFullscreenState);
    return () => document.removeEventListener('fullscreenchange', updateFullscreenState);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  };

  const toggleFullscreen = async () => {
    const player = playerRef.current;
    if (!player) return;

    try {
      if (document.fullscreenElement === player) {
        await document.exitFullscreen();
        return;
      }

      await player.requestFullscreen();

      if (window.matchMedia('(max-width: 768px)').matches) {
        try {
          await screen.orientation.lock('landscape');
        } catch {
          // Algunos navegadores móviles no permiten bloquear la orientación.
        }
      }
    } catch {
      // La API de pantalla completa puede no estar disponible en ciertos navegadores.
    }
  };


  const seek = (value: string) => {
    const nextTime = Number(value);
    const video = videoRef.current;
    if (!video || !Number.isFinite(nextTime)) return;

    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <section className="la-pelicula-page">
      <div ref={playerRef} className="la-pelicula-page__player">
        <video
          ref={videoRef}
          className="la-pelicula-page__video"
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        >
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no pudo reproducir el video.
        </video>

        <div
          className="la-pelicula-page__controls"
          role="group"
          aria-label="Controles de reproducción"
        >
          <button
            className="la-pelicula-page__control-button"
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? 'Pausar película' : 'Reproducir película'}
          >
            <img
              className="la-pelicula-page__control-icon"
              src={isPlaying ? pausaIcon : playIcon}
              alt=""
              aria-hidden="true"
            />
          </button>

          <button
            className="la-pelicula-page__control-button la-pelicula-page__fullscreen-button"
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Ver en pantalla completa'}
            title={isFullscreen ? 'Salir de pantalla completa' : 'Ver en pantalla completa'}
          >
            <span aria-hidden="true">{isFullscreen ? '⛶' : '⛶'}</span>
          </button>

          <label className="la-pelicula-page__timeline">
            <span className="la-pelicula-page__time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <input
              className="la-pelicula-page__seek"
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => seek(event.currentTarget.value)}
              disabled={!duration}
              aria-label="Posición de la película"
            />
          </label>
        </div>
      </div>
    </section>
  );
}
