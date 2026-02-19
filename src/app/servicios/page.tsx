import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Stethoscope, Microscope, Bone, PawPrint, Scissors, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export const metadata: Metadata = {
    title: 'Servicios | Centro Veterinario Zoé',
    description: 'Consultas generales, vacunación, cirugía, laboratorio, nutrición y peluquería. Servicios veterinarios profesionales para perros y gatos.',
};

export default function ServiciosPage() {

    const services = [
        {
            icon: Stethoscope,
            title: "Consulta y Medicina Preventiva",
            description: "Nuestra base para una vida larga y saludable. Realizamos chequeos completos, administramos vacunas esenciales y diseñamos planes de desparasitación a medida. Atendemos cualquier problema de salud, desde alergias hasta enfermedades crónicas, siempre con un enfoque en la prevención proactiva.",
            features: [
                "Exámenes físicos integrales.",
                "Vacunación personalizada (perros y gatos).",
                "Control de parásitos internos y externos.",
                "Asesoramiento nutricional y conductual."
            ],
            imageUrl: "https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            imageAlt: "Veterinario realizando un chequeo a un perro"
        },
        {
            icon: Microscope,
            title: "Laboratorio Clínico",
            description: "Diagnósticos rápidos y precisos gracias a nuestra tecnología in-house. Entender qué sucede dentro del organismo de tu mascota es crucial para iniciar el tratamiento correcto sin demoras innecesarias.",
            features: [
                "Hemogramas y bioquímicas sanguíneas.",
                "Urianálisis y coproparasitarios.",
                "Citologías y dermatología.",
                "Tests rápidos de enfermedades virales."
            ],
            imageUrl: "https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            imageAlt: "Equipo de laboratorio veterinario y microscopio"
        },
        {
            icon: Bone,
            title: "Cirugía General",
            description: "Seguridad, asepsia y control del dolor son nuestros pilares quirúrgicos. Desde procedimientos rutinarios hasta intervenciones de tejidos blandos, nuestro equipo garantiza el máximo cuidado durante la anestesia y recuperación.",
            features: [
                "Esterilizaciones y castraciones.",
                "Cirugía de tejidos blandos.",
                "Extracción de masas y tumores.",
                "Monitoreo anestésico multiparamétrico."
            ],
            imageUrl: "https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            imageAlt: "Equipo veterinario en quirófano"
        },
        {
            icon: PawPrint,
            title: "Hospitalización",
            description: "Un espacio diseñado para la recuperación tranquila. Cuando tu mascota necesita vigilancia constante, nuestro servicio de hospitalización ofrece monitoreo profesional y un ambiente libre de estrés.",
            features: [
                "Vigilancia médica continua.",
                "Fluidoterapia y manejo del dolor.",
                "Áreas separadas para reducir estrés.",
                "Reportes constantes a los propietarios."
            ],
            imageUrl: "https://images.pexels.com/photos/6235232/pexels-photo-6235232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            imageAlt: "Perro recibiendo tratamiento de fluidoterapia"
        },
        {
            icon: Scissors,
            title: "Peluquería Canina y Felina",
            description: "Salud y belleza van de la mano. Nuestros estilistas no solo dejan a tu mascota hermosa, sino que revisan el estado de su piel y pelaje, utilizando productos dermatológicos de alta gama.",
            features: [
                "Baños terapéuticos y cosméticos.",
                "Cortes de raza y esquilas sanitarias.",
                "Corte de uñas y limpieza de oídos.",
                "Deslanado y control de muda."
            ],
            imageUrl: "https://images.pexels.com/photos/6634166/pexels-photo-6634166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            imageAlt: "Perro recibiendo servicio de peluquería y baño"
        }
    ];

    return (
        <div className="bg-background overflow-x-hidden">
            {/* ═══════════════════════════════════════════
                HERO
                ═══════════════════════════════════════════ */}
            <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 md:pt-40 md:pb-32 overflow-hidden">
                {/* Animated gradient mesh background */}
                <div className="absolute inset-0 gradient-mesh pointer-events-none" />
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
                <div className="hidden md:block absolute top-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 animate-float-slow pointer-events-none" />
                <div className="hidden md:block absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2aaadd]/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 animate-float-delayed pointer-events-none" />

                <div className="container px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass border-primary/10 text-primary text-[11px] sm:text-xs md:text-sm font-medium mb-5 sm:mb-6 md:mb-8 animate-fade-up">
                        <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-primary" />
                        </span>
                        Excelencia Veterinaria
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold font-headline text-foreground tracking-tight mb-3 sm:mb-4 md:mb-6 leading-tight animate-fade-up delay-100">
                        Salud Integral para tus <br className="hidden md:block" />
                        <span className="text-gradient-animated relative inline-block">
                            Mascotas
                            <svg className="absolute w-full h-2 md:h-3 -bottom-1 md:-bottom-2 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-xl text-muted-foreground mt-4 sm:mt-6 md:mt-8 max-w-3xl mx-auto leading-relaxed animate-fade-up delay-200">
                        Descubre nuestra gama completa de servicios médicos y estéticos, diseñados con la última tecnología y un enfoque compasivo para cada etapa de la vida de tu compañero.
                    </p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                SERVICES LIST
                ═══════════════════════════════════════════ */}
            <section className="py-10 sm:py-16 md:py-32 space-y-10 sm:space-y-16 md:space-y-32">
                <div className="container px-4">
                    {services.map((service, index) => (
                        <div key={service.title} className="grid md:grid-cols-12 gap-6 sm:gap-8 md:gap-16 items-center mb-12 sm:mb-16 md:mb-24 last:mb-0">
                            {/* Image Column */}
                            <ScrollReveal
                                direction={index % 2 === 0 ? 'left' : 'right'}
                                className={`md:col-span-6 relative ${index % 2 !== 0 ? 'md:order-last' : ''}`}
                            >
                                <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-glow-lg border border-border/30 bg-card p-1 sm:p-1.5 md:p-2 group glow-border">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent mix-blend-overlay pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <Image
                                        src={service.imageUrl}
                                        alt={service.imageAlt}
                                        width={800}
                                        height={600}
                                        className="rounded-lg sm:rounded-xl md:rounded-2xl w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                {/* Decorative Icon Floater */}
                                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 glass p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl shadow-glow flex items-center justify-center z-20">
                                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary" />
                                </div>
                            </ScrollReveal>

                            {/* Content Column */}
                            <ScrollReveal
                                direction={index % 2 === 0 ? 'right' : 'left'}
                                delay={150}
                                className={`md:col-span-6 mt-4 sm:mt-6 md:mt-0 ${index % 2 !== 0 ? 'md:order-first' : ''}`}
                            >
                                <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                                    <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary/10 to-[#2aaadd]/10 text-primary font-bold text-sm sm:text-base md:text-lg font-headline border border-primary/20">
                                        0{index + 1}
                                    </span>
                                    <h2 className="font-bold font-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground">{service.title}</h2>
                                </div>

                                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6 md:mb-8">
                                    {service.description}
                                </p>

                                <div className="bg-secondary/30 dark:bg-secondary/10 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-8 border border-border/50 hover:border-primary/20 transition-all duration-500">
                                    <h4 className="font-bold text-foreground mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 text-sm sm:text-base md:text-lg">
                                        <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                        Lo que incluye este servicio:
                                    </h4>
                                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5 sm:gap-y-3 md:gap-y-4">
                                        {service.features.map(feature => (
                                            <li key={feature} className="flex items-start gap-2 md:gap-3 text-xs sm:text-sm md:text-base text-muted-foreground/90">
                                                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600 shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                BOTTOM CTA
                ═══════════════════════════════════════════ */}
            <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#2aaadd] to-primary bg-[length:200%_100%] animate-gradient-shift" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="absolute top-0 left-0 w-full h-px bg-white/10" />

                <div className="container px-4 relative z-10 text-center text-primary-foreground">
                    <ScrollReveal direction="up">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline mb-3 sm:mb-4 md:mb-6 tracking-tight">Tu mascota merece lo mejor</h2>
                        <p className="text-sm sm:text-lg md:text-xl text-primary-foreground/90 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto font-light">
                            Desde la prevención hasta el cuidado crítico, estamos aquí para acompañarlos en cada paso del camino.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center">
                            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto shadow-2xl text-primary font-bold h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg hover:scale-105 transition-transform">
                                <Link href="/contacto">Agenda una Cita</Link>
                            </Button>
                            <p className="text-xs sm:text-sm text-primary-foreground/70">o llámanos al <span className="font-bold text-white">+58 412 595 7240</span></p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
