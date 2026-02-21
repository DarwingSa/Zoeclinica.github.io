'use client';

import { Menu, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <header className={cn(
        "fixed w-full top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/85 backdrop-blur-2xl saturate-150 shadow-lg shadow-black/[0.06] dark:bg-background/80 dark:shadow-black/30"
          : "bg-background/60 backdrop-blur-md md:bg-transparent md:backdrop-blur-none"
      )}>
        {/* Gradient line at bottom of header */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500",
          isScrolled ? "opacity-100" : "opacity-0"
        )}>
          <div className="h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="flex h-20 md:h-24 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 relative z-10" onClick={handleLinkClick}>
              <Image
                src="/logo.png"
                alt="Centro Veterinario Zoé"
                width={360}
                height={100}
                className="h-16 md:h-20 w-auto dark:brightness-0 dark:invert transition-all duration-300"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-underline text-sm font-medium text-foreground/70 transition-colors hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2 ml-4">
              <ThemeToggle />
              <Button asChild className="rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300">
                <Link href="/contacto">Pedir Cita</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Abrir menú de navegación"
                aria-expanded={isMenuOpen}
                className="h-10 w-10"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          'md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300',
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        className={cn(
          'md:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-background/95 backdrop-blur-xl shadow-2xl z-[70] transition-transform duration-500 ease-out',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-6 pt-20">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 h-10 w-10"
            aria-label="Cerrar menú"
          >
            <X className="h-6 w-6" />
          </Button>

          <nav className="flex flex-col gap-1 flex-grow">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-medium text-foreground/80 transition-all hover:text-primary px-4 py-3 rounded-xl hover:bg-primary/5 animate-fade-up",
                )}
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border/50 pt-6 space-y-4">
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
            <Button asChild size="lg" className="w-full rounded-full shadow-glow">
              <Link href="/contacto" onClick={handleLinkClick}>Pedir Cita</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
