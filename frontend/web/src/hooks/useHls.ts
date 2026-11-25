/**Rol: conecta el <video> de La película con la lista de reproducción HLS. En Safari moderno usa la reproducción nativa (no descarga la librería); en el resto, pide hls.js con import dinámico y, si no puede, cae al modo nativo. También avisa cuando la película no está disponible o no se puede reproducir. */
import { useEffect, useState, type RefObject } from 'react';
import type Hls from 'hls.js';

/**
 * Estados de la conexión:
 * - 'idle': todavía no se intentó conectar nada.
 * - 'missing': no hay dirección de la película configurada.
 * - 'native': el navegador reproduce HLS por su cuenta (Safari); hls.js no se descarga.
 * - 'loading': se descarga la librería y se conecta el stream; la lista de reproducción todavía no se leyó.
 * - 'ready': hls.js leyó la lista de reproducción (MANIFEST_PARSED) y el video ya puede reproducirse.
 * - 'unsupported': ni el navegador ni hls.js pueden reproducir HLS en este equipo.
 * - 'error': la reproducción se cortó por un error que no se pudo recuperar.
 */
export type HlsStatus =
  | 'idle'
  | 'missing'
  | 'native'
  | 'loading'
  | 'ready'
  | 'unsupported'
  | 'error';

/** Motivo del estado 'error'. 'load': no se pudo cargar la librería. 'network': falló la red. 'media': falló la reproducción o la decodificación. 'other': cualquier otro error fatal. */
export type HlsErrorReason = 'load' | 'network' | 'media' | 'other';

export type HlsPlayback = {
  status: HlsStatus;
  error: HlsErrorReason | null;
};

/** Tipos MIME con los que los navegadores anuncian que reproducen HLS sin librería. */
const HLS_MIME_TYPES = ['application/vnd.apple.mpegurl', 'application/x-mpegURL'];

/** Cuántas veces se reintenta un error fatal de red o de medios antes de darse por vencido. */
const MAX_RECOVERIES = 2;

function canPlayHlsNatively(video: HTMLVideoElement): boolean {
  return HLS_MIME_TYPES.some((type) => video.canPlayType(type) !== '');
}

/**
 * ManagedMediaSource existe solo en Safari 17.1 o posterior, en macOS, iPhone y iPad.
 * Sirve para reconocerlo sin mirar el user agent: Chrome y otros navegadores responden "maybe" a canPlayType
 * para algunos streams HLS y después no los reproducen.
 */
function hasManagedMediaSource(): boolean {
  return 'ManagedMediaSource' in window;
}

/** Traduce el error del <video> a los motivos que entiende el sitio. */
function nativeErrorReason(mediaError: MediaError | null): HlsErrorReason {
  if (!mediaError) return 'other';
  if (mediaError.code === mediaError.MEDIA_ERR_NETWORK) return 'network';
  if (
    mediaError.code === mediaError.MEDIA_ERR_DECODE ||
    mediaError.code === mediaError.MEDIA_ERR_SRC_NOT_SUPPORTED
  ) {
    return 'media';
  }
  return 'other';
}

/** Le pasa la dirección al <video> y avisa si la reproducción nativa falla. Devuelve la función para desconectarlo. */
function attachNativeHls(
  video: HTMLVideoElement,
  src: string,
  onFailure: () => void,
): () => void {
  video.addEventListener('error', onFailure);
  video.src = src;

  return () => {
    video.removeEventListener('error', onFailure);
    video.removeAttribute('src');
    video.load();
  };
}

/**
 * Prepara el video para reproducir la película en HLS.
 * `src` es la lista de reproducción (.m3u8) del proveedor.
 * La librería se pide con `import('hls.js')` dentro del efecto: Vite la arma en un archivo aparte que solo se descarga en la página que usa este hook.
 */
export function useHls(
  videoRef: RefObject<HTMLVideoElement | null>,
  src: string | undefined,
): HlsPlayback {
  const [status, setStatus] = useState<HlsStatus>('idle');
  const [error, setError] = useState<HlsErrorReason | null>(null);

  // Sin dirección no hay nada que conectar: se resuelve al dibujar, sin pasar por el efecto.
  const playbackStatus: HlsStatus = src ? status : 'missing';
  const playbackError = src ? error : null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    setError(null);

    // Si el efecto se deshace antes de que llegue la librería, no hay que conectar nada.
    let cancelled = false;
    let player: Hls | null = null;
    let detachNative: (() => void) | null = null;
    let recoveries = 0;

    const handleNativeFailure = () => {
      if (cancelled) return;
      setError(nativeErrorReason(video.error));
      setStatus('error');
    };

    const startNative = () => {
      detachNative = attachNativeHls(video, src, handleNativeFailure);
      setStatus('native');
    };

    // Safari moderno reproduce HLS por su cuenta y no hace falta descargar hls.js. El chequeo de ManagedMediaSource
    // evita que un navegador que solo responde "maybe" a canPlayType se quede sin reproducir.
    if (hasManagedMediaSource() && canPlayHlsNatively(video)) {
      startNative();

      return () => {
        cancelled = true;
        detachNative?.();
      };
    }

    setStatus('loading');

    void import('hls.js')
      .then(({ default: HlsPlayer }) => {
        if (cancelled) return;

        // hls.js no puede reproducir acá. Si el navegador sí sabe hacerlo por su cuenta, se usa eso; si no, no hay forma.
        if (!HlsPlayer.isSupported()) {
          if (canPlayHlsNatively(video)) {
            startNative();
          } else {
            setStatus('unsupported');
          }
          return;
        }

        const instance = new HlsPlayer();
        player = instance;

        // 'ready' recién cuando se leyó la lista de reproducción: loadSource y attachMedia son asíncronos,
        // y hasta que el manifiesto no llega no hay nada para reproducir.
        instance.on(HlsPlayer.Events.MANIFEST_PARSED, () => {
          if (cancelled) return;
          setStatus('ready');
        });

        // Los errores no fatales los resuelve hls.js solo. Los fatales se reintentan un par de veces; si no alcanza,
        // se informan. Reiniciar la carga sin límite puede entrar en un ciclo, por eso el contador.
        instance.on(HlsPlayer.Events.ERROR, (_event, data) => {
          if (cancelled || !data.fatal) return;

          if (recoveries < MAX_RECOVERIES) {
            recoveries += 1;

            if (data.type === HlsPlayer.ErrorTypes.NETWORK_ERROR) {
              instance.startLoad();
              return;
            }
            if (data.type === HlsPlayer.ErrorTypes.MEDIA_ERROR) {
              instance.recoverMediaError();
              return;
            }
          }

          let reason: HlsErrorReason = 'other';
          if (data.type === HlsPlayer.ErrorTypes.NETWORK_ERROR) reason = 'network';
          if (data.type === HlsPlayer.ErrorTypes.MEDIA_ERROR) reason = 'media';

          instance.destroy();
          player = null;
          setError(reason);
          setStatus('error');
        });

        instance.loadSource(src);
        instance.attachMedia(video);
      })
      .catch((loadError: unknown) => {
        if (cancelled) return;
        console.error('No se pudo cargar el reproductor HLS.', loadError);
        setError('load');
        setStatus('error');
      });

    return () => {
      cancelled = true;
      detachNative?.();
      player?.destroy();
    };
  }, [videoRef, src]);

  return { status: playbackStatus, error: playbackError };
}