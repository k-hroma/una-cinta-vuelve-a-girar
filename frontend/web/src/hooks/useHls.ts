/**Rol: conecta el <video> de La película con hls.js. La librería se descarga recién cuando esta página la necesita (import dinámico), así el resto del sitio no carga un reproductor que no usa. */
import { useEffect, useState, type RefObject } from 'react';
import type Hls from 'hls.js';

/**
 * Estados de la conexión:
 * - 'idle': no hay película que cargar.
 * - 'loading': se descarga la librería y se conecta el stream; la lista de reproducción todavía no se leyó.
 * - 'ready': hls.js leyó la lista de reproducción (MANIFEST_PARSED) y el video ya puede reproducirse.
 * - 'unsupported': hls.js no es compatible con este navegador. No quiere decir que el navegador no pueda reproducir HLS:
 *   Safari lo hace de forma nativa, y ese camino se resuelve más adelante.
 * - 'error': la librería no se pudo importar o inicializar. Los errores de red y del stream llegan por eventos de hls.js
 *   y se tratan más adelante.
 */
export type HlsStatus = 'idle' | 'loading' | 'ready' | 'unsupported' | 'error';

/**
 * Prepara el video para reproducir la película en HLS.
 * `src` es la lista de reproducción (.m3u8) del proveedor.
 * La librería se pide con `import('hls.js')` dentro del efecto: Vite la arma en un archivo aparte que solo se descarga en la página que usa este hook.
 */
export function useHls(
  videoRef: RefObject<HTMLVideoElement | null>,
  src: string | undefined,
): HlsStatus {
  const [status, setStatus] = useState<HlsStatus>('idle');

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) {
      setStatus('idle');
      return;
    }

    // Si el efecto se deshace antes de que llegue la librería, no hay que conectar nada.
    let cancelled = false;
    let player: Hls | null = null;
    setStatus('loading');

    void import('hls.js')
      .then(({ default: HlsPlayer }) => {
        if (cancelled) return;

        // hls.js necesita Media Source Extensions. Si no están (por ejemplo, Safari en iPhone), la librería no puede
        // reproducir nada: ese caso se resuelve con la reproducción nativa del navegador.
        if (!HlsPlayer.isSupported()) {
          setStatus('unsupported');
          return;
        }

        player = new HlsPlayer();

        // 'ready' recién cuando se leyó la lista de reproducción: loadSource y attachMedia son asíncronos,
        // y hasta que el manifiesto no llega no hay nada para reproducir.
        player.on(HlsPlayer.Events.MANIFEST_PARSED, () => {
          if (cancelled) return;
          setStatus('ready');
        });

        player.loadSource(src);
        player.attachMedia(video);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        console.error('No se pudo cargar el reproductor HLS.', error);
        setStatus('error');
      });

    return () => {
      cancelled = true;
      player?.destroy();
    };
  }, [videoRef, src]);

  return status;
}