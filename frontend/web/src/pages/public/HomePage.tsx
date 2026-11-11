import ElProyectoIndexPage from '../../components/home/ElProyectoIndexPage';
import Hero from '../../components/home/Hero';
import LaPeliculaIndexPage from '../../components/home/LaPeliculaIndexPage';




export default function HomePage() {
  return (
    <section>
      <Hero />
      <LaPeliculaIndexPage />
      <ElProyectoIndexPage />
    </section>
  );
}
