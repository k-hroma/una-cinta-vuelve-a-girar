import { useLoaderData } from 'react-router';
import ElProyectoIndex from '../../components/home/ElProyectoIndex';
import GlosarioIndex from '../../components/home/GlosarioIndex';
import Hero from '../../components/home/Hero';
import LadoBSection from '../../components/home/LadoBSection';
import LaPeliculaIndex from '../../components/home/LaPeliculaIndex';
import MasacresShowCase from '../../components/home/MasacresShowCase';
import { homeLoader } from './homeLoader';

// En modo framework, React Router ejecuta esta función al generar la página en el build y entrega el resultado al componente.
// Como solo corre en el build, el código que consulta a Sanity no se incluye en el JavaScript que descarga el visitante.
export const loader = homeLoader;

export default function HomePage() {
  const { pages } = useLoaderData<typeof loader>();

  return (
    <section>
      <Hero />
      <LaPeliculaIndex pages={pages} />
      <ElProyectoIndex projectDescription={pages.home.projectDescription} />
      <GlosarioIndex />
      <MasacresShowCase />
      <LadoBSection pages={pages} />
    </section>
  );
}