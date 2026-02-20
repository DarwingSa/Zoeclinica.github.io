import { Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, CLINIC_INFO } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { WhatsAppIcon } from '@/components/ui/icons/whatsapp-icon';

export default function Footer() {
  return (
    <footer className="relative bg-secondary/30 text-foreground dark:bg-black/40 dark:text-white py-12 sm:py-16 md:py-20 pb-6 sm:pb-8 transition-colors duration-300 overflow-hidden">
      {/* Gradient top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      {/* Decorative background orb */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12">
          {/* Column 1: Logo and description */}
          <ScrollReveal direction="up" className="sm:col-span-2 md:col-span-5 flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-4 sm:mb-5 group">
              <Image
                src="/logo.png"
                alt="Centro Veterinario Zoé"
                width={320}
                height={90}
                className="h-14 sm:h-16 md:h-20 w-auto dark:brightness-0 dark:invert transition-all duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-xs sm:text-sm max-w-xs text-muted-foreground dark:text-muted-foreground leading-relaxed mb-5 sm:mb-6">
              Cuidado veterinario de la más alta calidad para perros y gatos. Nuestra misión es garantizar su bienestar con un equipo apasionado y la mejor tecnología.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Facebook, label: 'Facebook', href: '#' },
              ].map((social, index) => (
                <ScrollReveal key={social.label} direction="up" stagger={index} delay={300}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card dark:bg-white/5 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-glow-sm transition-all duration-300"
                  >
                    <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          {/* Column 2: Navigation */}
          <ScrollReveal direction="up" delay={100} className="md:col-span-3 text-center sm:text-left md:text-left">
            <h3 className="font-headline font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-5 text-primary">Navegación</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-foreground/70 hover:text-primary dark:text-white/60 dark:hover:text-primary transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Column 3: Contact */}
          <ScrollReveal direction="up" delay={200} className="sm:col-span-2 md:col-span-4 text-center sm:text-left md:text-left">
            <h3 className="font-headline font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-5 text-primary">Contacto</h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-foreground/70 dark:text-white/60">
              <li className="flex items-center gap-2.5 sm:gap-3 justify-center sm:justify-start">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                </div>
                <span>Calle Mirador con Av. 1, La Campiña, Distrito Capital</span>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3 justify-center sm:justify-start group">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/10 transition-colors">
                  <WhatsAppIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary group-hover:text-[#25D366] transition-colors" />
                </div>
                <a href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">{CLINIC_INFO.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3 justify-center sm:justify-start">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                </div>
                <a href="mailto:contacto@centrovetzoe.com" className="hover:text-primary transition-colors">contacto@centrovetzoe.com</a>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3 justify-center sm:justify-start">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                </div>
                <span>L-V: 9am - 6pm | Sáb: 9am - 6pm</span>
              </li>
            </ul>
          </ScrollReveal>
        </div>

        <div className="border-t border-primary/10 dark:border-white/5 mt-8 sm:mt-10 md:mt-12 pt-5 sm:pt-6 text-center text-xs sm:text-sm text-muted-foreground dark:text-white/40">
          <p>&copy; {new Date().getFullYear()} Centro Veterinario Zoé. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
