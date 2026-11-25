import { describe, expect, it } from 'vitest';

import routes from '../routes';
import { PAGES_LAYOUT_ID } from './usePagesData';

describe('PAGES_LAYOUT_ID', () => {
  it('coincide con el identificador que React Router le da al layout en routes.ts', () => {
    expect(PAGES_LAYOUT_ID).toBe(routes[0].file.replace(/\.tsx$/, ''));
  });
});