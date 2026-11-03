# Una Cinta Vuelve A Girar

Frontend del proyecto web **Una Cinta Vuelve A Girar**, una experiencia organizada alrededor de los lados A, B y C de una cinta. El sitio está en desarrollo: varias rutas de contenido muestran por ahora una página de construcción y la solución de backend o CMS todavía no fue definida.

## Requisitos

- Node.js `20.19+` o `22.12+`, según los requisitos de Vite 8.
- npm, para instalar las dependencias y ejecutar los scripts del proyecto.

## Puesta en marcha

Desde esta carpeta:

```sh
npm install
npm run dev
```

Vite muestra en la terminal la dirección local del servidor de desarrollo.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo con recarga en caliente. |
| `npm run lint` | Ejecuta Oxlint sobre el proyecto. |
| `npm run typecheck` | Ejecuta el chequeo de TypeScript sin generar el build de producción. |
| `npm run check` | Ejecuta Oxlint y el chequeo de TypeScript. |
| `npm run build` | Ejecuta el chequeo de TypeScript y genera el build de producción en `dist/`. |
| `npm run preview` | Sirve localmente el build generado para previsualizarlo. |

El proyecto usa Oxlint como único linter. `.editorconfig` define la codificación y convenciones básicas de indentación y fin de línea para los editores; no hay un formatter automático configurado.

## Estructura principal

```text
src/
  app/          Entrada de la aplicación React
  router/       Configuración del router y loaders de páginas
  config/       Navegación y configuración del sitio
  layout/       Estructura compartida, header, footer y errores
  components/   Componentes de interfaz
  common/       Componentes comunes
  pages/public/ Páginas públicas, agrupadas por lado de la cinta
  styles/       Estilos globales, de layout, componentes y páginas
  assets/       Imágenes, iconos, texturas y fuentes
public/         Archivos estáticos servidos sin procesar por Vite
```

Los paths y metadatos de navegación se definen en `src/config/navigation.ts`. Para agregar una ruta habilitada, agregá allí su entrada y asociá su `id` con el componente lazy correspondiente en `src/router/router.config.tsx`. El chequeo de tipos del build detecta asociaciones faltantes o sobrantes.

## Estado del proyecto

- Las rutas públicas están declaradas; varias páginas todavía reutilizan el placeholder `ConstructionPage`.
- No hay integración de datos ni decisión de backend/CMS.
- No hay un comando de tests configurado actualmente.
