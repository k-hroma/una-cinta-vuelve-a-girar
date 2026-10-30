/*navigation.ts determina qué páginas están habilitadas y cuáles son sus metadatos.*/

export const HOME_PATH = '/' as const;

export type SiteSide = 'a' | 'b' | 'c';

export type NavItem = {
  id: string;
  label: string;
  path: string;
  side: SiteSide;
  enabled: boolean;
  isSectionIntro?: boolean;
  hasBullet?: boolean;
  emphasis?: 'large';
};

export const SIDES: SiteSide[] = ['a', 'b', 'c'];

export const SIDE_LABELS: Record<SiteSide, string> = {
  a: '[ Lado A ]',
  b: '[ Lado B ]',
  c: '[ Lado C ]',
};

export const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Una cinta vuelve a girar',
    path: HOME_PATH,
    side: 'a',
    enabled: true,
    isSectionIntro: true,
  },
  {
    id: 'la-pelicula',
    label: 'La película',
    path: '/lado-a/la-pelicula',
    side: 'a',
    enabled: true,
    emphasis: 'large',
  },
  {
    id: 'volver-a-ver',
    label: 'Volver a ver, escuchar, preguntar',
    path: '/lado-a/volver-a-ver-escuchar-preguntar',
    side: 'a',
    enabled: true,
    hasBullet: true,
  },
  {
    id: 'la-cinta-y-el-soporte',
    label: 'La cinta y el soporte',
    path: '/lado-a/la-cinta-y-el-soporte',
    side: 'a',
    enabled: true,
    hasBullet: true,
  },
  {
    id: 'mario-celestino',
    label: 'Mario Celestino, realizador',
    path: '/lado-a/mario-celestino-realizador',
    side: 'a',
    enabled: true,
    hasBullet: true,
  },
  {
    id: 'glosario',
    label: 'Glosario',
    path: '/lado-a/glosario',
    side: 'a',
    enabled: true,
    emphasis: 'large',
  },
  {
    id: 'cuantas-masacres',
    label: 'Cuántas masacres',
    path: '/lado-a/cuantas-masacres',
    side: 'a',
    enabled: true,
    emphasis: 'large',
  },
  {
    id: 'con-el-cuerpo',
    label: 'Con el cuerpo',
    path: '/lado-a/con-el-cuerpo',
    side: 'a',
    enabled: true,
    emphasis: 'large',
  },
  {
    id: 'el-mundo-en-el-que-ocurrio',
    label: 'El mundo en el que ocurrió',
    path: '/lado-b/el-mundo-en-el-que-ocurrio',
    side: 'b',
    enabled: false,
    isSectionIntro: true,
  },
  {
    id: 'los-hechos',
    label: 'Los hechos',
    path: '/lado-b/los-hechos',
    side: 'b',
    enabled: false,
  },
  {
    id: 'lo-que-escucharon',
    label: 'Lo que escucharon, vieron, vivieron',
    path: '/lado-b/lo-que-escucharon-vieron-vivieron',
    side: 'b',
    enabled: false,
  },
  {
    id: 'vigilar',
    label: 'Vigilar',
    path: '/lado-b/vigilar',
    side: 'b',
    enabled: false,
  },
  {
    id: 'organizarse',
    label: 'Organizarse, cuidarse, luchar',
    path: '/lado-b/organizarse-cuidarse-luchar',
    side: 'b',
    enabled: false,
  },
  {
    id: 'las-pericias',
    label: 'Las pericias y la justicia',
    path: '/lado-b/las-pericias-y-la-justicia',
    side: 'b',
    enabled: false,
  },
  {
    id: 'la-prensa',
    label: 'La prensa',
    path: '/lado-b/la-prensa',
    side: 'b',
    enabled: false,
  },
  {
    id: 'las-madres',
    label: 'Las madres',
    path: '/lado-b/las-madres',
    side: 'b',
    enabled: false,
  },
  {
    id: 'los-chicos-muertos',
    label: 'Los chicos muertos',
    path: '/lado-b/los-chicos-muertos',
    side: 'b',
    enabled: false,
  },
  {
    id: 'fabulaciones',
    label: 'Fabulaciones y creaciones personales',
    path: '/lado-c/fabulaciones-y-creaciones-personales',
    side: 'c',
    enabled: false,
    isSectionIntro: true,
  },
];

export function getSectionIntro(side: SiteSide): NavItem | undefined {
  return navItems.find((item) => item.side === side && item.isSectionIntro);
}

export function getSectionPages(side: SiteSide): NavItem[] {
  return navItems.filter((item) => item.side === side && !item.isSectionIntro);
}

export function getEnabledContentRoutes(): NavItem[] {
  return navItems.filter((item) => item.enabled && item.path !== HOME_PATH);
}
