import { describe, expect, it } from 'vitest';

import * as homePage from './HomePage';
import { homeLoader } from './homeLoader';

describe('HomePage (módulo de ruta)', () => {
  it('exporta el loader de la home y el componente', () => {
    expect(homePage.loader).toBe(homeLoader);
    expect(typeof homePage.default).toBe('function');
  });
});
