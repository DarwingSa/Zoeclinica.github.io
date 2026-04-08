import Contact from '@/components/sections/contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ubicación y Contacto | Centro Veterinario Zoé en Caracas',
  description: 'Contáctanos para agendar una cita veterinaria en Caracas. Visita nuestra clínica en la Calle Mirador con Av. 1, La Campiña.',
  openGraph: {
    title: 'Visita el Centro Veterinario Zoé en La Campiña',
    description: 'Nuestros teléfonos, horarios y ubicación en Caracas. Agenda tu consulta fácilmente y obtén asesoría sanitaria de viajes.',
  }
};

export default function ContactPage() {
  return (
    <Contact />
  );
}
