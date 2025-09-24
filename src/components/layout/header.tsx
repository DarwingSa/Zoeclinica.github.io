'use client';

import { PawPrint, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#viajes', label: 'Viajes' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2" onClick={handleLinkClick}>
            <PawPrint className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary-foreground tracking-tight bg-primary px-2 py-1 rounded-md">
              VetPet Haven
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
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
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-foreground transition-colors hover:text-primary"
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
