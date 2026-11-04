export const HOME_PATH = '/' as const;

export type SiteSide = 'a' | 'b' | 'c';
export type PublicationStatus = 'published' | 'draft';
export type PageKind = 'intro' | 'page';

export type PageModel = {
  id: string;
  title: string;
  section: SiteSide | null;
  menuSection?: SiteSide;
  slug: string;
  publicationStatus: PublicationStatus;
  kind: PageKind;
  nav?: {
    emphasis?: 'large';
    hasBullet?: boolean;
    needMargin?: {
      top?: boolean;
      bottom?: boolean;
      right?: boolean;
    };
  };
};

export const SECTION_SEGMENTS: Record<SiteSide, string> = {
  a: 'lado-a',
  b: 'lado-b',
  c: 'lado-c',
};

export const SIDES: SiteSide[] = ['a', 'b', 'c'];

export const SIDE_LABELS: Record<SiteSide, string> = {
  a: '[ Lado A ]',
  b: '[ Lado B ]',
  c: '[ Lado C ]',
};

export const pageModels = [
  {
    id: 'home',
    title: 'Una cinta vuelve a girar',
    section: null,
    menuSection: 'a',
    slug: '',
    publicationStatus: 'published',
    kind: 'intro',
  },
  {
    id: 'la-pelicula',
    title: 'La película',
    section: 'a',
    slug: 'la-pelicula',
    publicationStatus: 'published',
    kind: 'page',
    nav: { emphasis: 'large' },
  },
  {
    id: 'volver-a-ver',
    title: 'Volver a ver, escuchar, preguntar',
    section: 'a',
    slug: 'volver-a-ver-escuchar-preguntar',
    publicationStatus: 'published',
    kind: 'page',
    nav: { hasBullet: true },
  },
  {
    id: 'la-cinta-y-el-soporte',
    title: 'La cinta y el soporte',
    section: 'a',
    slug: 'la-cinta-y-el-soporte',
    publicationStatus: 'published',
    kind: 'page',
    nav: { hasBullet: true },
  },
  {
    id: 'mario-celestino',
    title: 'Mario Celestino, realizador',
    section: 'a',
    slug: 'mario-celestino-realizador',
    publicationStatus: 'published',
    kind: 'page',
    nav: { hasBullet: true, needMargin: { bottom: true } },
  },
  {
    id: 'glosario',
    title: 'Glosario',
    section: 'a',
    slug: 'glosario',
    publicationStatus: 'published',
    kind: 'page',
    nav: { emphasis: 'large' },
  },
  {
    id: 'cuantas-masacres',
    title: 'Cuántas masacres',
    section: 'a',
    slug: 'cuantas-masacres',
    publicationStatus: 'published',
    kind: 'page',
    nav: { emphasis: 'large' },
  },
  {
    id: 'con-el-cuerpo',
    title: 'Con el cuerpo',
    section: 'a',
    slug: 'con-el-cuerpo',
    publicationStatus: 'published',
    kind: 'page',
    nav: { emphasis: 'large' },
  },
  {
    id: 'el-mundo-en-el-que-ocurrio',
    title: 'El mundo en el que ocurrió',
    section: 'b',
    slug: 'el-mundo-en-el-que-ocurrio',
    publicationStatus: 'published',
    kind: 'intro',
  },
  {
    id: 'los-hechos',
    title: 'Los hechos',
    section: 'b',
    slug: 'los-hechos',
    publicationStatus: 'published',
    kind: 'page',
    nav: { needMargin: { top: true } },
  },
  {
    id: 'lo-que-escucharon',
    title: 'Lo que escucharon, vieron, vivieron',
    section: 'b',
    slug: 'lo-que-escucharon-vieron-vivieron',
    publicationStatus: 'published',
    kind: 'page',
  },
  {
    id: 'vigilar',
    title: 'Vigilar',
    section: 'b',
    slug: 'vigilar',
    publicationStatus: 'published',
    kind: 'page',
  },
  {
    id: 'organizarse',
    title: 'Organizarse, cuidarse, luchar',
    section: 'b',
    slug: 'organizarse-cuidarse-luchar',
    publicationStatus: 'published',
    kind: 'page',
    nav: { needMargin: { right: true } },
  },
  {
    id: 'las-pericias',
    title: 'Las pericias y la justicia',
    section: 'b',
    slug: 'las-pericias-y-la-justicia',
    publicationStatus: 'published',
    kind: 'page',
  },
  {
    id: 'la-prensa',
    title: 'La prensa',
    section: 'b',
    slug: 'la-prensa',
    publicationStatus: 'published',
    kind: 'page',
  },
  {
    id: 'las-madres',
    title: 'Las madres',
    section: 'b',
    slug: 'las-madres',
    publicationStatus: 'published',
    kind: 'page',
  },
  {
    id: 'los-chicos-muertos',
    title: 'Los chicos muertos',
    section: 'b',
    slug: 'los-chicos-muertos',
    publicationStatus: 'published',
    kind: 'page',
  },
  {
    id: 'fabulaciones',
    title: 'Fabulaciones y creaciones personales',
    section: 'c',
    slug: 'fabulaciones-y-creaciones-personales',
    publicationStatus: 'published',
    kind: 'intro',
  },
] as const satisfies readonly PageModel[];

export type PublishedPage = Extract<
  (typeof pageModels)[number],
  { publicationStatus: 'published' }
>;

export function derivePath(
  page: Pick<PageModel, 'section' | 'slug'>,
): string {
  if (page.section === null) return HOME_PATH;
  return `/${SECTION_SEGMENTS[page.section]}/${page.slug}`;
}

export function getPublishedPages(): PageModel[] {
  return pageModels.filter((page) => page.publicationStatus === 'published');
}

export function getSectionIntro(side: SiteSide): PageModel | undefined {
  const publishedPages = getPublishedPages();
  const sectionIntro = publishedPages.find(
    (page) => page.section === side && page.kind === 'intro',
  );

  if (sectionIntro) return sectionIntro;

  return publishedPages.find((page) => page.menuSection === side);
}

export function getSectionPages(side: SiteSide): PageModel[] {
  return getPublishedPages().filter(
    (page) => page.section === side && page.kind === 'page',
  );
}

export function getPublishedContentRoutes(): PageModel[] {
  return getPublishedPages().filter(
    (page) => derivePath(page) !== HOME_PATH,
  );
}
