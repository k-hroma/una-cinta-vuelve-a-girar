import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
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
  const [areControlsVisible, setAreControlsVisible] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const previousVolumeRef = useRef(1);
  const controlsTimeoutRef = useRef<number | undefined>(undefined);
  const lastPointerTypeRef = useRef<string | null>(null);
  const suppressPointerUntilRef = useRef(0);

  useEffect(() => {
    const updateFullscreenState = () => {
      const fullscreen = document.fullscreenElement === playerRef.current;
      setIsFullscreen(fullscreen);
      setAreControlsVisible(false);
      window.clearTimeout(controlsTimeoutRef.current);
      suppressPointerUntilRef.current = fullscreen ? Date.now() + 350 : 0;
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

  const revealControls = (event: ReactPointerEvent<HTMLDivElement>) => {
    lastPointerTypeRef.current = event.pointerType;
    if (document.fullscreenElement && event.pointerType !== 'touch' && Date.now() < suppressPointerUntilRef.current) return;

    setAreControlsVisible(true);
    window.clearTimeout(controlsTimeoutRef.current);

    if (event.pointerType !== 'touch') return;

    controlsTimeoutRef.current = window.setTimeout(() => {
      setAreControlsVisible(false);
    }, 2500);
  };

  const hideControls = () => {
    if (lastPointerTypeRef.current === 'touch') return;

    window.clearTimeout(controlsTimeoutRef.current);
    setAreControlsVisible(false);
  };


  const seek = (value: string) => {
    const nextTime = Number(value);
    const video = videoRef.current;
    if (!video || !Number.isFinite(nextTime)) return;

    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const changeVolume = (value: string) => {
    const nextVolume = Number(value);
    const video = videoRef.current;
    if (!video || !Number.isFinite(nextVolume)) return;

    video.volume = nextVolume;
    video.muted = nextVolume === 0;
    setVolume(nextVolume);

    if (nextVolume > 0) previousVolumeRef.current = nextVolume;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (volume > 0) {
      previousVolumeRef.current = volume;
      video.volume = 0;
      video.muted = true;
      setVolume(0);
      return;
    }

    const restoredVolume = previousVolumeRef.current || 1;
    video.volume = restoredVolume;
    video.muted = false;
    setVolume(restoredVolume);
  };

  return (
    <section className="la-pelicula-page">
      <div
        ref={playerRef}
        className="la-pelicula-page__player"
      >
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
          className="la-pelicula-page__controls-zone"
          onPointerEnter={revealControls}
          onPointerMove={revealControls}
          onPointerDown={revealControls}
          onPointerLeave={hideControls}
        >
          <div
            className={`la-pelicula-page__controls${areControlsVisible ? ' la-pelicula-page__controls--visible' : ''}`}
            role="group"
            aria-label="Controles de reproducción"
          >
            <label className="la-pelicula-page__timeline">
              <input
                className="la-pelicula-page__seek"
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(currentTime, duration || 0)}
                style={{
                  '--range-progress': `${duration ? (currentTime / duration) * 100 : 0}%`,
                } as CSSProperties & { '--range-progress': string }}
                onChange={(event) => seek(event.currentTarget.value)}
                disabled={!duration}
                aria-label="Posición de la película"
              />
              <span className="la-pelicula-page__time">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </label>

            <div className="la-pelicula-page__action-controls">
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

              <div className="la-pelicula-page__volume-control">
                <button
                  className="la-pelicula-page__control-button la-pelicula-page__volume-button"
                  type="button"
                  onClick={toggleMute}
                  aria-label={volume === 0 ? 'Activar sonido' : 'Silenciar'}
                  title={volume === 0 ? 'Activar sonido' : 'Silenciar'}
                >
                  <svg
                    className="la-pelicula-page__volume-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M4 10v4h4l5 4V6l-5 4H4Z" />
                    {volume > 0 ? (
                      <>
                        <path d="M16 9a5 5 0 0 1 0 6" />
                        <path d="M18.5 6.5a8.5 8.5 0 0 1 0 11" />
                      </>
                    ) : (
                      <path d="m16 9 5 6m0-6-5 6" />
                    )}
                  </svg>
                </button>
                <label className="la-pelicula-page__volume-label">
                  <span className="la-pelicula-page__sr-only">Volumen</span>
                  <input
                    className="la-pelicula-page__volume-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    style={{ '--range-progress': `${volume * 100}%` } as CSSProperties & {
                      '--range-progress': string;
                    }}
                    onChange={(event) => changeVolume(event.currentTarget.value)}
                    aria-label="Volumen"
                  />
                </label>
              </div>

              <button
                className="la-pelicula-page__control-button la-pelicula-page__fullscreen-button"
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Ver en pantalla completa'}
                title={isFullscreen ? 'Salir de pantalla completa' : 'Ver en pantalla completa'}
              >
                <span aria-hidden="true">{isFullscreen ? '⛶' : '⛶'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
