import { describe, expect, it } from 'vitest';

import { createFakeVideoService, FAKE_HLS_URL } from './fakeVideoService';

describe('createFakeVideoService', () => {
  it('devuelve una dirección de prueba por defecto', async () => {
    const video = await createFakeVideoService().getVideo();

    expect(video).toEqual({ hlsUrl: FAKE_HLS_URL });
  });

  it('permite simular que la película todavía no está cargada', async () => {
    const video = await createFakeVideoService(null).getVideo();

    expect(video).toBeNull();
  });
});