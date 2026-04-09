import Contact from '@/components/sections/contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ubicación, Horarios y Contacto — Agenda tu Cita Veterinaria en Caracas',
  description: 'Contáctanos para agendar una cita veterinaria en La Campiña, Caracas. Dirección: Calle Mirador con Av. 1. Horario: L-S 9am-6pm. WhatsApp, teléfono y correo disponibles.',
  alternates: {
    canonical: 'https://centrovetzoe.com/contacto',
  },
  openGraph: {
    title: 'Contacto y Ubicación | Centro Veterinario Zoé — La Campiña, Caracas',
    description: 'Dirección, horarios de atención, teléfono y WhatsApp del Centro Veterinario Zoé en La Campiña, Caracas. Agenda tu consulta veterinaria hoy.',
  }
};

export default function ContactPage() {
  return (
    <Contact />
  );
}
