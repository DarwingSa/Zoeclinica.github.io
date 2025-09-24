import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Plane, Hospital } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-dog-cat');

  const pageLinks = [
    {
      icon: Stethoscope,
      title: "Nuestros Servicios",
      description: "Descubre la gama completa de cuidados que ofrecemos, desde consultas hasta diagnósticos avanzados.",
      href: "/servicios",
      cta: "Ver Servicios"
    },
    {
      icon: Plane,
      title: "Asesoría de Viajes",
      description: "Prepara a tu mascota para viajes internacionales con nuestra guía experta y gestión de trámites.",
      href: "/viajes",
      cta: "Asesoría de Viajes"
    },
    {
      icon: Hospital,
      title: "Servicio de Hospitalización",
      description: "Conoce nuestras instalaciones y el cuidado especializado que brindamos a los pacientes que requieren internación.",
      href: "/hospitalizaciones",
      cta: "Ver Más"
    },
  ];

  return (
    <div>
      <section id="inicio" className="bg-background section-padding pt-12 md:pt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tighter mb-4">
                Cuidado experto para tus mejores amigos
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                En VetPet Haven, ofrecemos atención veterinaria de la más alta calidad exclusivamente para perros y gatos. Nuestra misión es garantizar su bienestar con un equipo apasionado y la mejor tecnología. Tu tranquilidad y su salud son nuestra prioridad.
              </p>
              <Button asChild size="lg" className="shadow-lg">
                <Link href="/contacto">Contáctanos</Link>
              </Button>
            </div>
            <div className="flex justify-center">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-2xl object-cover"
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-muted section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pageLinks.map((link) => (
              <Card key={link.title} className="text-center flex flex-col">
                <CardHeader className="items-center">
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                    <link.icon className="h-8 w-8" />
                  </div>
                  <CardTitle>{link.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{link.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild className='w-full'>
                    <Link href={link.href}>{link.cta}</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
