import Contact from '@/components/sections/contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Centro Veterinario Zoé',
  description: 'Contáctanos para agendar una cita veterinaria. Dirección, teléfono, email y formulario de contacto.',
};

export default function ContactPage() {
  return (
    <Contact />
  );
}
