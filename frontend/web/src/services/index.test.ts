import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('paginasService (servicio real)', () => {
  it('importarlo no exige variables de entorno', async () => {
    vi.stubEnv('VITE_SANITY_PROJECT_ID', '');

    const { paginasService } = await import('./index');

    expect(typeof paginasService.getPaginas).toBe('function');
  });

  it('al pedir páginas sin variables de entorno falla con un mensaje claro', async () => {
    vi.stubEnv('VITE_SANITY_PROJECT_ID', '');

    const { paginasService } = await import('./index');

    await expect(paginasService.getPaginas()).rejects.toThrow(
      'VITE_SANITY_PROJECT_ID',
    );
  });
});