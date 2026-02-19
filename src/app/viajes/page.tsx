import TravelGuidance from '@/components/sections/travel-guidance';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Viajes Internacionales | Centro Veterinario Zoé',
  description: 'Asesoría para viajar con tu mascota al extranjero. Requisitos sanitarios, certificados y presupuesto estimado para perros y gatos.',
};

export default function TravelPage() {
  return (
    <div>
      <TravelGuidance />
    </div>
  );
}
