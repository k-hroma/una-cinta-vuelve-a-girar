import { describe, expect, it } from 'vitest';

import type { VideoService } from '../../../services';
import {
  createFakeVideoService,
  FAKE_HLS_URL,
} from '../../../services/fake/fakeVideoService';
import { createLaPeliculaLoader } from './laPeliculaLoader';

describe('createLaPeliculaLoader', () => {
  it('entrega la lista de reproducción que devuelve el servicio', async () => {
    const { video } = await createLaPeliculaLoader(createFakeVideoService())();

    expect(video).toEqual({ hlsUrl: FAKE_HLS_URL });
  });

  it('entrega null si la película todavía no está cargada', async () => {
    const { video } = await createLaPeliculaLoader(createFakeVideoService(null))();

    expect(video).toBeNull();
  });

  it('propaga el error si el servicio falla', async () => {
    const failing: VideoService = {
      getVideo: async () => {
        throw new Error('sin conexión con el CMS');
      },
    };

    await expect(createLaPeliculaLoader(failing)()).rejects.toThrow(
      'sin conexión con el CMS',
    );
  });
});