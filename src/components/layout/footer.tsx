import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, CLINIC_INFO } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative bg-secondary/30 text-foreground dark:bg-black/40 dark:text-white section-padding pb-8 transition-colors duration-300 overflow-hidden">
      {/* Gradient top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      {/* Decorative background orb */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Column 1: Logo and description */}
          <div className="md:col-span-5 flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              <Image
                src="/logo.png"
                alt="Centro Veterinario Zoé"
                width={320}
                height={90}
                className="h-16 md:h-20 w-auto dark:brightness-0 dark:invert transition-all duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm max-w-xs text-muted-foreground dark:text-muted-foreground leading-relaxed mb-6">
              Cuidado veterinario de la más alta calidad para perros y gatos. Nuestra misión es garantizar su bienestar con un equipo apasionado y la mejor tecnología.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Facebook, label: 'Facebook', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-card dark:bg-white/5 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-glow-sm transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3 text-center md:text-left">
            <h3 className="font-headline font-semibold text-sm uppercase tracking-wider mb-5 text-primary">Navegación</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-primary dark:text-white/60 dark:hover:text-primary transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-4 text-center md:text-left">
            <h3 className="font-headline font-semibold text-sm uppercase tracking-wider mb-5 text-primary">Contacto</h3>
            <ul className="space-y-4 text-sm text-foreground/70 dark:text-white/60">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span>Calle de la Veterinaria 123, 28001 Madrid</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <a href="tel:+584125957240" className="hover:text-primary transition-colors">+58 412 595 7240</a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <a href="mailto:contacto@vetpethaven.es" className="hover:text-primary transition-colors">contacto@vetpethaven.es</a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <span>L-V: 9am - 8pm | Sáb: 10am - 2pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 dark:border-white/5 mt-12 pt-6 text-center text-sm text-muted-foreground dark:text-white/40">
          <p>&copy; {new Date().getFullYear()} Centro Veterinario Zoé. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
