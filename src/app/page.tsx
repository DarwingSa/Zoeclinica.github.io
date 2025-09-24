import Contact from '@/components/sections/contact';
import Diagnostics from '@/components/sections/diagnostics';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import TravelGuidance from '@/components/sections/travel-guidance';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Diagnostics />
      <TravelGuidance />
      <Contact />
    </main>
  );
}
