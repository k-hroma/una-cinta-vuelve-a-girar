import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('sanityClient', () => {
  it('se configura con las variables de entorno y lee solo lo publicado', async () => {
    vi.stubEnv('VITE_SANITY_PROJECT_ID', 'abc12345');
    vi.stubEnv('VITE_SANITY_DATASET', 'production');
    vi.stubEnv('VITE_SANITY_API_VERSION', '2026-03-01');

    const { sanityClient } = await import('./client');
    const config = sanityClient.config();

    expect(config.projectId).toBe('abc12345');
    expect(config.dataset).toBe('production');
    expect(config.apiVersion).toContain('2026-03-01');
    expect(config.useCdn).toBe(false);
    expect(config.perspective).toBe('published');
  });

  it('falla con un mensaje claro si falta una variable de entorno', async () => {
    vi.stubEnv('VITE_SANITY_PROJECT_ID', '');
    vi.stubEnv('VITE_SANITY_DATASET', 'production');
    vi.stubEnv('VITE_SANITY_API_VERSION', '2026-03-01');

    await expect(import('./client')).rejects.toThrow('VITE_SANITY_PROJECT_ID');
  });
});