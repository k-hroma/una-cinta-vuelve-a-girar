import type { RouteConfigEntry } from '@react-router/dev/routes';

/** Aplana el árbol de rutas de routes.ts: devuelve cada ruta, incluidos los hijos de los layouts. */
export function flattenRoutes(entries: readonly RouteConfigEntry[]): RouteConfigEntry[] {
  return entries.flatMap((entry) => [entry, ...flattenRoutes(entry.children ?? [])]);
}