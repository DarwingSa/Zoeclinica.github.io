import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Stethoscope, Microscope, Bone, PawPrint, Scissors, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

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
      // Imagen de veterinaria consultando
      imageUrl: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=2070",
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
      // Imagen de laboratorio / microscopio
      imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2070",
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
      // Imagen de cirugía veterinaria
      imageUrl: "https://images.unsplash.com/photo-1581093458891-9f302695bc59?auto=format&fit=crop&q=80&w=2070",
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
      // Imagen de perro recuperándose / cuidado
      imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=2071",
      imageAlt: "Perro descansando cómodamente"
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
      // Imagen de peluquería canina
      imageUrl: "https://images.unsplash.com/photo-1596272875729-ed2c21ebbbda?auto=format&fit=crop&q=80&w=2070", 
      imageAlt: "Cuidado y estética de mascotas"
    }
    ];

    return (
        <div className="bg-background">
            <section className="relative bg-secondary/30 pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

                <div className="container text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-primary/10 text-primary text-sm font-medium mb-8">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                        </span>
                        Excelencia Veterinaria
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold font-headline text-foreground tracking-tight mb-6 leading-tight">
                        Salud Integral para tus <br className="hidden md:block" />
                        <span className="text-primary relative inline-block">
                            Mascotas
                            <svg className="absolute w-full h-3 -bottom-2 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mt-8 max-w-3xl mx-auto leading-relaxed">
                        Descubre nuestra gama completa de servicios médicos y estéticos, diseñados con la última tecnología y un enfoque compasivo para cada etapa de la vida de tu compañero.
                    </p>
                </div>
            </section>

            <section className="py-20 md:py-32 space-y-24 md:space-y-32">
                <div className="container">
                    {services.map((service, index) => (
                        <div key={service.title} className="grid md:grid-cols-12 gap-8 md:gap-16 items-center mb-24 last:mb-0">
                            {/* Image Column */}
                            <div className={`md:col-span-6 relative ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-white p-2 group">
                                     <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none z-10"></div>
                                    <Image
                                        src={service.imageUrl}
                                        alt={service.imageAlt}
                                        width={800}
                                        height={600}
                                        className="rounded-2xl w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                        unoptimized
                                    />
                                </div>
                                {/* Decorative Icon Floater */}
                                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-border/50 hidden md:flex items-center justify-center z-20">
                                    <service.icon className="h-8 w-8 text-primary" />
                                </div>
                            </div>

                            {/* Content Column */}
                            <div className={`md:col-span-6 ${index % 2 !== 0 ? 'md:order-first' : ''}`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg font-headline">
                                        0{index + 1}
                                    </span>
                                    <h2 className="font-bold font-headline text-3xl md:text-4xl text-foreground">{service.title}</h2>
                                </div>
                                
                                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                    {service.description}
                                </p>

                                <div className="bg-secondary/30 rounded-3xl p-6 md:p-8 border border-secondary">
                                    <h4 className="font-bold text-foreground mb-6 flex items-center gap-2 text-lg">
                                        <ShieldCheck className="h-5 w-5 text-primary" />
                                        Lo que incluye este servicio:
                                    </h4>
                                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-4">
                                        {service.features.map(feature => (
                                            <li key={feature} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground/90">
                                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="relative py-24 overflow-hidden bg-primary text-primary-foreground">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
                <div className="container relative z-10 text-center">
                     <h2 className="text-3xl md:text-5xl font-bold font-headline mb-6 tracking-tight">Tu mascota merece lo mejor</h2>
                    <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto font-light">
                        Desde la prevención hasta el cuidado crítico, estamos aquí para acompañarlos en cada paso del camino.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Button asChild size="lg" variant='secondary' className="shadow-2xl text-primary font-bold h-14 px-10 text-lg hover:scale-105 transition-transform hover:shadow-white/20">
                            <Link href="/contacto">Agenda una Cita</Link>
                        </Button>
                        <p className="text-sm text-primary-foreground/70">o llámanos al <span className="font-bold text-white">+34 912 345 678</span></p>
                    </div>
                </div>
            </section>
        </div>
    );
}
