import { describe, expect, it } from 'vitest';

import routes from './routes';

// Al generar el sitio, cada página se carga en Node (sin navegador). Si algún archivo usara window o document
// al importarse, el build fallaría: este test lo detecta antes.
const modules = import.meta.glob<{ default: unknown }>('./pages/public/**/*.tsx');

describe('módulos de ruta', () => {
  it.each(routes.map((entry) => entry.file))(
    '%s se puede cargar en Node y exporta un componente',
    async (file) => {
      const load = modules[`./${file}`];
      expect(load, `no existe src/${file}`).toBeDefined();

      const module = await load();

      expect(typeof module.default).toBe('function');
    },
  );
});