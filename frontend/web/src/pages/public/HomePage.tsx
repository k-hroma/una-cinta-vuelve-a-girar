import ElProyectoIndex from '../../components/home/ElProyectoIndex';
import GlosarioIndex from '../../components/home/GlosarioIndex';
import Hero from '../../components/home/Hero';
import LadoBSection from '../../components/home/LadoBSection';
import LaPeliculaIndex from '../../components/home/LaPeliculaIndex';
import MasacresShowCase from '../../components/home/MasacresShowCase';




export default function HomePage() {
  return (
    <section>
      <Hero />
      <LaPeliculaIndex />
      <ElProyectoIndex />
      <GlosarioIndex />
      <MasacresShowCase />
      <LadoBSection />
    </section>
  );
}
