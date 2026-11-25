import type { Config } from '@react-router/dev/config';

export default {
  // El código del sitio vive en src/ (el valor por defecto de React Router es app/).
  appDirectory: 'src',
  // Sitio estático: no hay servidor que renderice páginas al vuelo. Las páginas se generan en el build (ver `prerender`).
  ssr: false,
  // Sin servidor no hay quien responda al pedido de rutas bajo demanda (/__manifest): se declaran todas desde el principio.
  routeDiscovery: { mode: 'initial' },
  // Páginas que se generan como HTML en el build (y que el servidor de desarrollo también renderiza, con su loader).
  // getStaticPaths() devuelve las direcciones de todas las rutas de routes.ts que no son comodín: la lista sale de
  // navigation.ts sin repetirla.
  prerender: ({ getStaticPaths }) => getStaticPaths(),
} satisfies Config;