'use client';

import { PawPrint, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/viajes', label: 'Viajes' },
  { href: '/hospitalizaciones', label: 'Hospitalizaciones' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary section-padding pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Columna 1: Logo y descripción */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <PawPrint className="h-8 w-8 text-primary" />
              <span className="text-xl font-headline font-bold text-foreground tracking-tight">
                VetPet Haven
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Cuidado veterinario de la más alta calidad para perros y gatos. Nuestra misión es garantizar su bienestar con un equipo apasionado y la mejor tecnología.
            </p>
          </div>

          {/* Columna 2: Enlaces de navegación */}
          <div>
            <h3 className="font-headline font-semibold text-lg mb-4 text-center md:text-left">Navegación</h3>
            <ul className="space-y-2 text-center md:text-left">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Información de Contacto */}
          <div>
            <h3 className="font-headline font-semibold text-lg mb-4 text-center md:text-left">Contacto</h3>
            <ul className="space-y-3 text-sm text-muted-foreground text-center md:text-left">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Calle de la Veterinaria 123, 28001 Madrid</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:+34912345678" className="hover:text-primary">+34 912 345 678</a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:contacto@vetpethaven.es" className="hover:text-primary">contacto@vetpethaven.es</a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span>L-V: 9am - 8pm | Sáb: 10am - 2pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
          {year && <p>&copy; {year} VetPet Haven. Todos los derechos reservados.</p>}
        </div>
      </div>
    </footer>
  );
}
