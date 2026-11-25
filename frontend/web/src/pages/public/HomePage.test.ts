import { describe, expect, it } from 'vitest';

import * as homePage from './HomePage';

describe('HomePage (módulo de ruta)', () => {
  it('exporta el componente y no tiene loader propio: sus datos vienen de PagesLayout', () => {
    expect(typeof homePage.default).toBe('function');
    expect(homePage).not.toHaveProperty('loader');
  });
});