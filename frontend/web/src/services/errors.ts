/**Rol: error que indica que el contenido editorial no se pudo obtener (sin conexión, el CMS no responde, datos inválidos). No depende de ningún CMS: la pantalla de error lo reconoce sin saber qué servicio hay detrás. El error original queda en `cause`. */
export class ContentUnavailableError extends Error {
  constructor(cause: unknown) {
    const detail = cause instanceof Error ? cause.message : String(cause);
    super(`No se pudo cargar el contenido: ${detail}`, { cause });
    this.name = 'ContentUnavailableError';
  }
}