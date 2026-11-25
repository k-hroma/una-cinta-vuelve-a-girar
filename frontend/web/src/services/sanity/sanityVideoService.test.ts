import { describe, expect, it } from 'vitest';

import { ContentUnavailableError } from '../errors';
import { createSanityVideoService } from './sanityVideoService';

describe('createSanityVideoService', () => {
  it('traduce el documento que trae fetchDoc', async () => {
    const service = createSanityVideoService({
      fetchDoc: async () => ({ urlHls: 'https://vz-abc.b-cdn.net/1/playlist.m3u8' }),
    });

    await expect(service.getVideo()).resolves.toEqual({
      hlsUrl: 'https://vz-abc.b-cdn.net/1/playlist.m3u8',
    });
  });

  it('si todavía no hay documento, devuelve null', async () => {
    const service = createSanityVideoService({ fetchDoc: async () => null });

    await expect(service.getVideo()).resolves.toBeNull();
  });

  it('si falla la consulta al CMS, rechaza con ContentUnavailableError y conserva la causa', async () => {
    const original = new Error('sin conexión');
    const service = createSanityVideoService({
      fetchDoc: async () => {
        throw original;
      },
    });

    const error: unknown = await service.getVideo().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ContentUnavailableError);
    expect((error as ContentUnavailableError).cause).toBe(original);
  });
});