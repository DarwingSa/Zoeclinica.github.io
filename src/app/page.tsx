import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Stethoscope, Star, Heart, Medal, Handshake, Scissors,
  Bone, Microscope, PawPrint, ArrowRight, Shield, Clock,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

/* ─────────────────────────────── DATA ─────────────────────────────── */

const HERO_IMAGE =
  'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

const PHILOSOPHY_IMAGE =
  'https://images.pexels.com/photos/6234603/pexels-photo-6234603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

const services = [
  {
    icon: Stethoscope,
    title: 'Consulta y Medicina Preventiva',
    description: 'Chequeos integrales y planes preventivos personalizados para una vida larga y sana.',
    id: 'preventiva',
  },
  {
    icon: Microscope,
    title: 'Laboratorio Clínico',
    description: 'Diagnósticos precisos y rápidos con tecnología de vanguardia.',
    id: 'laboratorio',
  },
  {
    icon: Bone,
    title: 'Cirugía General',
    description: 'Procedimientos seguros con monitoreo avanzado y cuidado postoperatorio.',
    id: 'cirugia',
  },
  {
    icon: PawPrint,
    title: 'Hospitalización',
    description: 'Cuidado intensivo 24/7 en un ambiente controlado y libre de estrés.',
    id: 'hospitalizacion',
  },
  {
    icon: Scissors,
    title: 'Peluquería Canina y Felina',
    description: 'Estética profesional y cuidado dermatológico para que luzcan radiantes.',
    id: 'peluqueria',
  },
];

const testimonials = [
  {
    name: 'Ana García',
    pet: 'Max, Golden Retriever',
    quote:
      'El equipo de Centro Veterinario Zoé es increíblemente profesional y cariñoso. Max siempre se siente tranquilo aquí. ¡No confiaría su salud a nadie más!',
  },
  {
    name: 'Carlos Pérez',
    pet: 'Luna, Gato Siamés',
    quote:
      'Gracias a su asesoría de viajes, pude llevar a Luna a Francia sin ningún problema. Gestionaron todo el papeleo y me dieron una tranquilidad inmensa.',
  },
  {
    name: 'María Rodríguez',
    pet: 'Rocky, Bulldog Francés',
    quote:
      'Rocky tuvo que ser hospitalizado de urgencia y el cuidado que recibió fue excepcional. Me mantuvieron informado en todo momento. ¡Grandes profesionales!',
  },
];

const stats = [
  { icon: Shield, value: '24/7', label: 'Emergencias' },
  { icon: Medal, value: '+10', label: 'Años de Experiencia' },
  { icon: Heart, value: '+500', label: 'Mascotas Felices' },
  { icon: Clock, value: '100%', label: 'Compromiso' },
];

/* ──────────────────────────── COMPONENT ───────────────────────────── */

export default function Home() {
  return (
    <div className="bg-background overflow-x-hidden">
      {/* ═══════════════════════════════════════════
          HERO — Full-width immersive
          ═══════════════════════════════════════════ */}
      <section id="inicio" className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Perros felices jugando en el parque"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40 dark:from-background dark:via-background/90 dark:to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </div>

        {/* Decorative orbs */}
        <div className="hidden md:block absolute top-20 right-[20%] w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="hidden md:block absolute bottom-20 left-[10%] w-48 h-48 bg-[#2aaadd]/10 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

        <div className="container relative z-10 px-4 md:px-8">
          <div className="max-w-2xl space-y-5 sm:space-y-6 md:space-y-8">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass border-primary/20 text-primary text-[11px] sm:text-xs md:text-sm font-semibold animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Centro Veterinario Zoé
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-headline text-foreground tracking-tight leading-[1.08] animate-fade-up delay-100">
              Cuidado experto{' '}
              <br className="hidden sm:block" />
              para tus{' '}
              <span className="text-gradient-animated">
                mejores amigos
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-[52ch] leading-relaxed animate-fade-up delay-200">
              Combinamos pasión y tecnología de vanguardia para ofrecer la mejor atención veterinaria. Tu tranquilidad y su bienestar son nuestra prioridad.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 animate-fade-up delay-300">
              <Button asChild size="lg" className="text-sm sm:text-base md:text-lg h-11 sm:h-12 md:h-14 px-5 sm:px-6 md:px-8 shadow-glow-lg hover:shadow-glow-xl hover:translate-y-[-2px] transition-all duration-300">
                <Link href="/contacto">
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Pedir Cita Ahora
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-sm sm:text-base md:text-lg h-11 sm:h-12 md:h-14 px-5 sm:px-6 md:px-8 hover:bg-primary/5 hover:text-primary hover:border-primary/40 transition-all duration-300">
                <Link href="/servicios">Conocer Servicios</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom gradient fadeout */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════════
          STATS BAR — Floating trust indicators
          ═══════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 md:-mt-16 pb-6 sm:pb-8 md:pb-12">
        <div className="container px-4">
          <ScrollReveal direction="up" duration={800}>
            <div className="glass-strong rounded-2xl md:rounded-3xl shadow-glow-lg p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {stats.map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <ScrollReveal key={stat.label} direction="up" stagger={index} delay={200}>
                      <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 group">
                        <div className="bg-primary/10 text-primary p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                          <StatIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </div>
                        <div>
                          <p className="font-extrabold text-lg sm:text-xl md:text-2xl text-foreground leading-none">{stat.value}</p>
                          <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider font-semibold text-muted-foreground mt-0.5">{stat.label}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES — Bento grid
          ═══════════════════════════════════════════ */}
      <section id="servicios" className="py-12 sm:py-16 md:py-28 bg-background relative">
        <div className="container px-4">
          {/* Section header */}
          <ScrollReveal direction="up" className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
            <span className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm mb-3 block">
              Nuestros Servicios
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline text-foreground mb-3 sm:mb-4 md:mb-6">
              Todo lo que necesitan en un solo lugar
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
              Desde chequeos rutinarios hasta intervenciones complejas, contamos con las instalaciones y el equipo humano para cuidar de ellos.
            </p>
          </ScrollReveal>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
            {/* Featured — spans 4 cols */}
            {(() => {
              const FeaturedIcon = services[0].icon;
              return (
                <ScrollReveal direction="zoom" className="sm:col-span-2 md:col-span-4">
                  <div className="group relative bg-gradient-to-br from-primary to-[#2aaadd] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden min-h-[220px] sm:min-h-[260px] flex flex-col justify-end shadow-glow-lg">
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.08]" />
                    {/* Decorative orb */}
                    <div className="absolute -top-16 -right-16 w-40 sm:w-56 h-40 sm:h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    {/* Icon */}
                    <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-white/15 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform duration-500">
                      <FeaturedIcon className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    <div className="relative z-10 text-white">
                      <h3 className="font-bold text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 font-headline">{services[0].title}</h3>
                      <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-5 max-w-lg">{services[0].description}</p>
                      <Link href="/servicios" className="inline-flex items-center text-white font-bold text-sm md:text-base hover:gap-3 transition-all duration-300 group/link gap-2">
                        Ver detalles completos <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })()}

            {/* Second service — spans 2 cols */}
            {(() => {
              const Icon2 = services[1].icon;
              return (
                <ScrollReveal direction="up" delay={100} className="md:col-span-2">
                  <div className="group relative bg-card/80 dark:bg-card/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-border/50 hover:border-primary/30 hover:shadow-glow transition-all duration-500 flex flex-col justify-between glow-border overflow-hidden min-h-[220px] sm:min-h-[260px] h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="bg-primary/10 text-primary rounded-xl sm:rounded-2xl p-3 sm:p-3.5 w-fit group-hover:bg-primary group-hover:text-white group-hover:shadow-glow transition-all duration-500 relative z-10">
                      <Icon2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    </div>
                    <div className="relative z-10 mt-3 sm:mt-4">
                      <h4 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2 font-headline text-foreground">{services[1].title}</h4>
                      <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">{services[1].description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })()}

            {/* Remaining services — 2 cols each */}
            {services.slice(2).map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <ScrollReveal key={service.id} direction="up" stagger={index} delay={200} className="md:col-span-2">
                  <div className="group relative bg-card/80 dark:bg-card/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-border/50 hover:border-primary/30 hover:shadow-glow transition-all duration-500 flex flex-col justify-between glow-border overflow-hidden min-h-[200px] sm:min-h-[220px] h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="bg-primary/10 text-primary rounded-xl sm:rounded-2xl p-3 sm:p-3.5 w-fit group-hover:bg-primary group-hover:text-white group-hover:shadow-glow transition-all duration-500 relative z-10">
                      <ServiceIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    </div>
                    <div className="relative z-10 mt-3 sm:mt-4">
                      <h4 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2 font-headline text-foreground">{service.title}</h4>
                      <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Services CTA */}
          <ScrollReveal direction="up" delay={300} className="text-center mt-8 sm:mt-10 md:mt-14">
            <Button asChild size="lg" variant="outline" className="h-11 sm:h-12 md:h-14 px-6 sm:px-8 text-sm sm:text-base font-bold hover:bg-primary/5 hover:text-primary hover:border-primary/40 transition-all duration-300">
              <Link href="/servicios">
                Explorar Todos los Servicios <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHILOSOPHY — Split screen
          ═══════════════════════════════════════════ */}
      <section id="philosophy" className="py-12 sm:py-16 md:py-28 bg-secondary/20 dark:bg-secondary/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="hidden md:block absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-24 items-center">
            {/* Image Side */}
            <ScrollReveal direction="left" className="relative order-last md:order-first">
              {/* Background accent shape */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-primary/15 to-[#2aaadd]/10 rounded-[2.5rem] rotate-3 translate-x-4 translate-y-4 -z-10" />
              <div className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-glow-xl w-full aspect-[4/5] bg-muted group">
                <Image
                  src={PHILOSOPHY_IMAGE}
                  alt="Veterinario sonriendo con un gato"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 right-4 sm:right-8 text-white">
                  <p className="font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">Dr. Eduardo Peña</p>
                  <p className="text-white/80 text-[11px] sm:text-xs md:text-sm">Médico Veterinario</p>
                </div>
              </div>
              {/* Floating experience badge */}
              <div className="absolute -bottom-4 -right-2 md:-bottom-5 md:-right-5 glass-strong p-3 md:p-4 rounded-2xl shadow-glow-lg z-20 animate-float hidden md:flex items-center gap-3">
                <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                  <Medal className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-extrabold text-lg text-foreground leading-none">+10 años</p>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mt-0.5">de experiencia</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Content Side */}
            <ScrollReveal direction="right" className="space-y-5 sm:space-y-6 md:space-y-8">
              <div>
                <span className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm mb-2 sm:mb-3 block">Nuestra Filosofía</span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline text-foreground mb-3 sm:mb-4 md:mb-6">
                  Más que veterinarios, somos amantes de los animales
                </h2>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                Creemos que la medicina veterinaria debe ir acompañada de empatía. Cada diagnóstico y tratamiento se realiza pensando no solo en la salud física, sino en el bienestar emocional de tu mascota y tu tranquilidad.
              </p>

              <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                {[
                  { icon: Heart, title: 'Trato Compasivo', desc: 'Tratamos a cada paciente como si fuera nuestro propio compañero.' },
                  { icon: Medal, title: 'Excelencia Médica', desc: 'Formación continua y protocolos actualizados internacionalmente.' },
                  { icon: Handshake, title: 'Transparencia Total', desc: 'Te explicamos cada paso del proceso de forma clara y honesta.' },
                ].map((item, index) => {
                  const ValueIcon = item.icon;
                  return (
                    <ScrollReveal key={index} direction="up" stagger={index} delay={100}>
                      <div className="flex items-start gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-card/80 dark:bg-card/40 backdrop-blur-sm shadow-sm border border-transparent hover:border-primary/20 hover:shadow-glow-sm transition-all duration-500 group border-gradient-left">
                        <div className="bg-primary/10 text-primary p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <ValueIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">{item.title}</h4>
                          <p className="text-muted-foreground text-[11px] sm:text-xs md:text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 md:py-28 bg-background relative overflow-hidden">
        <div className="hidden md:block absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />

        <div className="container px-4">
          <ScrollReveal direction="up" className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm mb-2 sm:mb-3 block">Testimonios</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline text-foreground">Historias de colitas felices</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} direction="up" stagger={index}>
                <Card className="group bg-card/60 dark:bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-glow transition-all duration-500 p-0 h-full flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden">
                  <CardContent className="pt-6 sm:pt-8 px-5 sm:px-6 md:px-8 flex-grow relative">
                    {/* Quote mark */}
                    <div className="text-primary/10 absolute top-4 sm:top-6 left-5 sm:left-6 md:left-8">
                      <svg width="32" height="32" className="sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01691 21L5.01691 18C5.01691 16.8954 5.91234 16 7.01691 16H10.0169C10.5692 16 11.0169 15.5523 11.0169 15V9C11.0169 8.44772 10.5692 8 10.0169 8H6.01691C5.46462 8 5.01691 8.44772 5.01691 9V11C5.01691 11.5523 4.56919 12 4.01691 12H3.01691V5H13.0169V15C13.0169 18.3137 10.3306 21 7.01691 21H5.01691Z" />
                      </svg>
                    </div>
                    <p className="text-foreground/80 mb-4 sm:mb-6 italic text-sm sm:text-base md:text-lg leading-relaxed relative z-10 pt-8 sm:pt-10">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 border-t border-foreground/5 pt-3 sm:pt-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-[#2aaadd] flex items-center justify-center text-primary-foreground font-bold text-base sm:text-lg md:text-xl shadow-glow-sm">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-foreground text-sm sm:text-base md:text-lg">{testimonial.name}</p>
                        <p className="text-muted-foreground text-[11px] sm:text-xs md:text-sm font-medium">{testimonial.pet}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRE-FOOTER CTA
          ═══════════════════════════════════════════ */}
      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#2aaadd] to-primary bg-[length:200%_200%] animate-gradient-shift" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.08]" />
        {/* Decorative orbs */}
        <div className="absolute top-10 right-[10%] w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-10 left-[5%] w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10 text-center px-4">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline mb-3 sm:mb-4 md:mb-6 tracking-tight text-white">
                ¿Listos para darle a tu mejor amigo{' '}
                <br className="hidden md:block" />
                el cuidado que merece?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                Agenda una cita hoy y únete a la familia de Centro Veterinario Zoé.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="font-bold h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <Link href="/contacto">Agenda una Cita</Link>
                </Button>
                <Button asChild size="lg" className="font-bold h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg bg-white/90 text-primary hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0">
                  <Link href="/servicios">Ver Servicios</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
