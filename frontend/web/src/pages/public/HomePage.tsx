import { useLoaderData } from 'react-router';
import ElProyectoIndex from '../../components/home/ElProyectoIndex';
import GlosarioIndex from '../../components/home/GlosarioIndex';
import Hero from '../../components/home/Hero';
import LadoBSection from '../../components/home/LadoBSection';
import LaPeliculaIndex from '../../components/home/LaPeliculaIndex';
import MasacresShowCase from '../../components/home/MasacresShowCase';
import type { HomeLoaderData } from './homeLoader';

export default function HomePage() {
  const { pages } = useLoaderData<HomeLoaderData>();

  return (
    <section>
      <Hero />
      <LaPeliculaIndex pages={pages} />
      <ElProyectoIndex />
      <GlosarioIndex />
      <MasacresShowCase />
      <LadoBSection />
    </section>
  );
}