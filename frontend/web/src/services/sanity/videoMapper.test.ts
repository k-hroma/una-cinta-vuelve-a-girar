import { describe, expect, it } from 'vitest';

import { mapVideo } from './videoMapper';

describe('mapVideo', () => {
  it('traduce el documento a la dirección de la lista de reproducción', () => {
    const video = mapVideo({
      urlHls: 'https://vz-abc.b-cdn.net/1234/playlist.m3u8',
    });

    expect(video).toEqual({
      hlsUrl: 'https://vz-abc.b-cdn.net/1234/playlist.m3u8',
    });
  });

  it('devuelve null si todavía no hay documento', () => {
    expect(mapVideo(null)).toBeNull();
  });

  it('devuelve null si el documento no tiene dirección', () => {
    expect(mapVideo({ urlHls: null })).toBeNull();
  });

  it('descarta una dirección vacía o con solo espacios', () => {
    expect(mapVideo({ urlHls: '' })).toBeNull();
    expect(mapVideo({ urlHls: '   ' })).toBeNull();
  });

  it('limpia los espacios de los costados', () => {
    expect(
      mapVideo({ urlHls: '  https://vz-abc.b-cdn.net/1/playlist.m3u8  ' }),
    ).toEqual({ hlsUrl: 'https://vz-abc.b-cdn.net/1/playlist.m3u8' });
  });
});