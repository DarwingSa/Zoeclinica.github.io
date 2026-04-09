import TravelGuidance from '@/components/sections/travel-guidance';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trámites de Viajes Internacionales para Mascotas — INSAI, CEXGAN, Pasaportes',
  description: 'Asesoría y gestión completa de trámites INSAI, permisos zoosanitarios, pasaportes, vacunas contra rabia, microchips y certificados CEXGAN para viajar con tu perro o gato desde Venezuela a Europa, EE. UU. y Latinoamérica.',
  alternates: {
    canonical: 'https://centrovetzoe.com/viajes',
  },
  openGraph: {
    title: 'Viajes Internacionales de Mascotas desde Venezuela | Centro Veterinario Zoé',
    description: 'Gestión INSAI, microchips, vacunas y permisos internacionales desde Venezuela. Preparamos a tu mascota para viajar a Europa, EE. UU. y Latinoamérica.',
  }
};

export default function TravelPage() {
  return (
    <div>
      <TravelGuidance />
    </div>
  );
}
