import TravelGuidance from '@/components/sections/travel-guidance';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trámites de Viajes para Mascotas (INSAI) | Centro Veterinario Zoé',
  description: 'Asesoría y gestión completa de trámites internacionales, permisos INSAI, pasaportes, vacunas y certificados CEXGAN para viajar con tu perro o gato.',
  openGraph: {
    title: 'Viajes Internacionales de Mascotas | Centro Vet Zoé',
    description: 'Gestión INSAI, microchips y permisos internacionales desde Venezuela. Preparamos a tu mascota para viajar a Europa, EE. UU. y LATAM.',
  }
};

export default function TravelPage() {
  return (
    <div>
      <TravelGuidance />
    </div>
  );
}
