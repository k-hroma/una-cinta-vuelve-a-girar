/**Rol: define qué páginas existen, a qué lado pertenecen, cómo se llaman y cómo se muestran en el menú. De acá salen el menú y las rutas. */

export const HOME_PATH = '/' as const;

export type SiteSide = 'a' | 'b' | 'c';
export type PublicationStatus = 'published' | 'draft';
export type PageKind = 'intro' | 'page';

// Es el molde: define qué campos tiene que tener cada página
export type PageModel = {
  id: string;
  title: string;
  section: SiteSide | null; // 'a' | 'b' | 'c' | null (null = la home)
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

// SECTION_SEGMENTS traduce 'a' en 'lado-a', que es lo que va en la URL.
export const SECTION_SEGMENTS: Record<SiteSide, string> = {
  a: 'lado-a',
  b: 'lado-b',
  c: 'lado-c',
};

// SIDES es un array para poder recorrer los lados (SIDES.map(...) en el menú), porque un tipo no se puede recorrer: se borra al compilar.
export const SIDES: SiteSide[] = ['a', 'b', 'c'];

// SIDE_LABELS traduce 'a' en '[ Lado A ]', que es lo que se ve en el menú.
export const SIDE_LABELS: Record<SiteSide, string> = {
  a: '[ Lado A ]',
  b: '[ Lado B ]',
  c: '[ Lado C ]',
};

// lista real: son 18 objetos
// satisfies readonly PageModel[]: “verificá que cada objeto cumpla el molde PageModel"
// as const: “no ensanches los valores, dejalos exactos”. Sin esto, TS pensaría que id es un string cualquiera. Con esto sabe que el id de la primera página es exactamente 'home'.
export const pageModels = [
  {
    id: 'home',
    title: 'Una cinta vuelve a girar',
    section: null,
    slug: '',
    publicationStatus: 'published',
    kind: 'page',
  },
  {
    id: 'una-cinta-vuelve-a-girar',
    title: 'Una cinta vuelve a girar',
    section: 'a',
    slug: 'una-cinta-vuelve-a-girar',
    publicationStatus: 'draft',
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
    publicationStatus: 'draft',
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
    publicationStatus: 'draft',
    kind: 'intro',
  },
] as const satisfies readonly PageModel[];

// Tipo calculado a partir de los datos---> un tipo que representa “una página publicada”. Por eso PublishedPage['id'] es la unión de los ids publicados
// se lee de adentro haciia afuera:
// typeof pageModels: “el tipo de la lista de datos”.
// [number]: “el tipo de cualquier elemento de ese array”
// Extract<..., { publicationStatus: 'published' }>: “de esa unión, quedate solo con los que tengan publicationStatus: 'published'”.
export type PublishedPage = Extract<(typeof pageModels)[number], { publicationStatus: 'published' }>;


// de ficha a URL--> ejemplo
// entrada { section: 'a', slug: 'la-pelicula' }	
// salida: '/lado-a/la-pelicula'
export function derivePath(
  page: Pick<PageModel, 'section' | 'slug'>,
): string {
  if (page.section === null) return HOME_PATH;
  return `/${SECTION_SEGMENTS[page.section]}/${page.slug}`;
}

//filter recorre el array y devuelve uno nuevo con los elementos que cumplen la condición. Devuelve PageModel[].
export function getPublishedPages(): PageModel[] {
  return pageModels.filter((page) => page.publicationStatus === 'published');
}

export function getDraftPages(): PageModel[] {
  return pageModels.filter((page) => page.publicationStatus === 'draft');
}

// 
export function getSectionIntro(side: SiteSide): PageModel | undefined {
  const publishedPages = getPublishedPages();
  const draftPages = getDraftPages()
  const sectionIntro = draftPages.find(
    (page) => page.section === side && page.kind === 'intro',
  );

  if (sectionIntro) return sectionIntro; // si existe de las paginas publicadas, aquella que coincide con la seccion recibida y es intro, se devuelve

  return publishedPages.find((page) => page.menuSection === side); // si no devuelve un array con las paginas en las que coincide el menuSection con "side" 

  //si no hay ninguna de las dos se devuelve undefined
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
