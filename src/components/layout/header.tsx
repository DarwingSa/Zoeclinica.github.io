'use client';

import { PawPrint, Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/viajes', label: 'Viajes' },
  { href: '/hospitalizaciones', label: 'Hospitalizaciones' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={handleLinkClick}>
            <PawPrint className="h-8 w-8 text-primary" />
            <span className="text-xl font-headline font-bold text-foreground tracking-tight">
              VetPet Haven
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
             <a href="tel:+34912345678" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +34 912 345 678
            </a>
          </nav>
          <div className="hidden md:flex items-center gap-2">
             <Button asChild>
                <Link href="/contacto">Pedir Cita</Link>
             </Button>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute top-20 left-0 w-full bg-background shadow-lg transition-transform duration-300 ease-in-out',
          isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-[150%]'
        )}
      >
        <nav className="flex flex-col items-center gap-4 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-foreground transition-colors hover:text-primary"
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
           <a href="tel:+34912345678" className="text-lg font-medium text-foreground transition-colors hover:text-primary" onClick={handleLinkClick}>
              +34 912 345 678
            </a>
          <Button asChild size="lg" className="w-full mt-4">
             <Link href="/contacto" onClick={handleLinkClick}>Pedir Cita</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
