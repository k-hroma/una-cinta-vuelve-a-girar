import type { Config } from '@react-router/dev/config';

export default {
  // El código del sitio vive en src/ (el valor por defecto de React Router es app/).
  appDirectory: 'src',
  // Sitio estático: no hay servidor que renderice páginas al vuelo. Las páginas se generan en el build (ver `prerender`, paso 43).
  ssr: false,
  // Sin servidor no hay quien responda al pedido de rutas bajo demanda (/__manifest): se declaran todas desde el principio.
  routeDiscovery: { mode: 'initial' },
} satisfies Config;