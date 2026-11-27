// Schema: la descripción, escrita en código, de qué tipos de documento existen en el Studio y qué campos tiene cada uno. El Studio construye sus formularios a partir de ella.
// Páginas del sitio que tienen un documento "Página" en el Studio.
// El `value` tiene que ser igual al `id` de las páginas publicadas de
// frontend/web/src/config/navigation.ts. Si se publica una página nueva allá,
// hay que agregarla acá.

//Es una duplicación consciente y con un riesgo: si cambia navigation.ts (por ejemplo, un borrador que se publica), hay que actualizar este archivo. La comprobación de que ambas listas coinciden la dejamos para el tipo propio y el mapper

export const pageOptions: {value: string; title: string}[] = [
  {value: 'home', title: 'Home'},
  {value: 'la-pelicula', title: 'Lado A · La película'},
  {value: 'volver-a-ver', title: 'Lado A · Volver a ver, volver a escuchar, volver a preguntar'},
  {value: 'la-cinta-y-el-soporte', title: 'Lado A · La cinta y el soporte'},
  {value: 'mario-celestino', title: 'Lado A · El realizador'},
  {value: 'glosario', title: 'Lado A · Glosario'},
  {value: 'masacres-filmadas', title: 'Lado A · Masacres filmadas'},
  {value: 'masacres-nombradas', title: 'Lado A · Masacres nombradas'},
  {value: 'ingeniero-budge', title: 'Lado B · Ingeniero Budge'},
  {value: 'la-amistad-en-una-esquina', title: 'Lado B · La amistad en una esquina'},
  {value: 'los-hechos', title: 'Lado B · Los hechos'},
  {value: 'testigxs', title: 'Lado B · Testigxs'},
  {value: 'vigilar', title: 'Lado B · Vigilar'},
  {value: 'las-pruebas', title: 'Lado B · Las pruebas'},
  {value: 'la-prensa', title: 'Lado B · La prensa'},
  {value: 'los-chicos-muertos', title: 'Lado B · Los chicos muertos'},
  {value: 'las-madres', title: 'Lado B · Las madres'},
  {value: 'la-cav', title: 'Lado B · La CAV'},
]