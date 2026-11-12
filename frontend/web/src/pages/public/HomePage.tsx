import ElProyectoIndexPage from '../../components/home/ElProyectoIndexPage';
import GlosarioIndexPage from '../../components/home/GlosarioIndexPage';
import Hero from '../../components/home/Hero';
import LadoBSection from '../../components/home/LadoBSection';
import LaPeliculaIndexPage from '../../components/home/LaPeliculaIndexPage';
import MasacresShowcase from '../../components/home/MasacresShowCaseIndexPage';




export default function HomePage() {
  return (
    <section>
      <Hero />
      <LaPeliculaIndexPage />
      <ElProyectoIndexPage />
      <GlosarioIndexPage />
      <MasacresShowcase />
      <LadoBSection />
    </section>
  );
}
