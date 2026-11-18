/**Rol: único lugar donde el sitio lee variables de entorno de Sanity. Valida que existan y las exporta ya tipadas como string. Todo lo que empieza con VITE_ es público: queda dentro del código que descarga el navegador. */

function requerida(nombre: string, valor: string | undefined): string {
  if (!valor) {
    throw new Error(
      `Falta la variable de entorno ${nombre}. Revisá frontend/web/.env.local (si no existe, copiá .env.example como .env.local).`,
    );
  }
  return valor;
}

export const sanityEnv = {
  projectId: requerida(
    'VITE_SANITY_PROJECT_ID',
    import.meta.env.VITE_SANITY_PROJECT_ID,
  ),
  dataset: requerida(
    'VITE_SANITY_DATASET',
    import.meta.env.VITE_SANITY_DATASET,
  ),
  apiVersion: requerida(
    'VITE_SANITY_API_VERSION',
    import.meta.env.VITE_SANITY_API_VERSION,
  ),
} as const;