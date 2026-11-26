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
  {value: 'cuantas-masacres', title: 'Lado A · Cuántas masacres'},
  {value: 'con-el-cuerpo', title: 'Lado A · Con el cuerpo'},
  {value: 'los-hechos', title: 'Lado B · Los hechos'},
  {value: 'lo-que-escucharon', title: 'Lado B · Lo que escucharon, vieron, vivieron'},
  {value: 'vigilar', title: 'Lado B · Vigilar'},
  {value: 'organizarse', title: 'Lado B · Organizarse, cuidarse, luchar'},
  {value: 'las-pericias', title: 'Lado B · Las pericias y la justicia'},
  {value: 'la-prensa', title: 'Lado B · La prensa'},
  {value: 'las-madres', title: 'Lado B · Las madres'},
  {value: 'los-chicos-muertos', title: 'Lado B · Los chicos muertos'},
]