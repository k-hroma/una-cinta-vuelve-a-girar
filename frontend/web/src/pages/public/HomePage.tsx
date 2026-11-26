import ElProyectoIndex from '../../components/home/ElProyectoIndex';
import GlosarioIndex from '../../components/home/GlosarioIndex';
import Hero from '../../components/home/Hero';
import LadoBSection from '../../components/home/LadoBSection';
import LaPeliculaIndex from '../../components/home/LaPeliculaIndex';
import MasacresShowCase from '../../components/home/MasacresShowCase';
import { usePagesData } from '../../layout/usePagesData';

export default function HomePage() {
  const { pages } = usePagesData();

  return (
    <section>
      <Hero />
      <LaPeliculaIndex pages={pages} />
      <ElProyectoIndex projectDescription={pages.home.projectDescription} />
      <GlosarioIndex pages={pages} />
      <MasacresShowCase />
      <LadoBSection pages={pages} />
    </section>
  );
}