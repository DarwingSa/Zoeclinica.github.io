import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Stethoscope, Plane, Hospital, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-dog-cat');
  const philosophyImage = PlaceHolderImages.find(p => p.id === 'vet-smiling');

  const pageLinks = [
    {
      icon: Stethoscope,
      title: "Nuestros Servicios",
      description: "Descubre la gama completa de cuidados que ofrecemos, desde consultas hasta diagnósticos avanzados.",
      href: "/servicios",
      cta: "Ver Más"
    },
    {
      icon: Plane,
      title: "Asesoría de Viajes",
      description: "Prepara a tu mascota para viajes internacionales con nuestra guía experta y gestión de trámites.",
      href: "/viajes",
      cta: "Ver Más"
    },
    {
      icon: Hospital,
      title: "Servicio de Hospitalización",
      description: "Conoce nuestras instalaciones y el cuidado especializado que brindamos a los pacientes que requieren internación.",
      href: "/hospitalizaciones",
      cta: "Ver Más"
    },
  ];
  
  const testimonials = [
    {
      name: "Ana García",
      pet: "Max, Golden Retriever",
      quote: "El equipo de VetPet Haven es increíblemente profesional y cariñoso. Max siempre se siente tranquilo aquí. ¡No confiaría su salud a nadie más!",
    },
    {
      name: "Carlos Pérez",
      pet: "Luna, Gato Siamés",
      quote: "Gracias a su asesoría de viajes, pude llevar a Luna conmigo a Francia sin ningún problema. Gestionaron todo el papeleo y me dieron una tranquilidad inmensa.",
    },
    {
        name: "María Rodríguez",
        pet: "Rocky, Bulldog Francés",
        quote: "Rocky tuvo que ser hospitalizado de urgencia y el cuidado que recibió fue excepcional. Me mantuvieron informado en todo momento. ¡Grandes profesionales!",
    }
  ];

  return (
    <div>
      <section id="inicio" className="bg-background section-padding pt-12 md:pt-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-extrabold font-headline text-foreground tracking-tighter mb-4">
                Cuidado experto para tus mejores amigos
              </h1>
              <p className="text-base text-muted-foreground mb-8 max-w-[60ch] mx-auto md:mx-0">
                En VetPet Haven, ofrecemos atención veterinaria de la más alta calidad exclusivamente para perros y gatos. Nuestra misión es garantizar su bienestar con un equipo apasionado y la mejor tecnología. Tu tranquilidad y su salud son nuestra prioridad.
              </p>
              <Button asChild size="lg" className="shadow-lg hover:-translate-y-0.5 hover:shadow-primary/40">
                <Link href="/contacto">Pedir Cita</Link>
              </Button>
            </div>
            <div className="flex justify-center">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg object-cover"
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-secondary section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pageLinks.map((link) => (
              <Card key={link.title} className="text-center flex flex-col shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardHeader className="items-center">
                  <div className="mx-auto bg-background text-primary rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                    <link.icon className="h-8 w-8" />
                  </div>

                  <CardTitle className="font-headline text-2xl">{link.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{link.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="outline" className='w-full text-primary border-primary hover:bg-primary/5 hover:text-primary'>
                    <Link href={link.href}>{link.cta}</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="philosophy" className="bg-background section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              {philosophyImage && (
                <Image
                  src={philosophyImage.imageUrl}
                  alt={philosophyImage.description}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg object-cover"
                  data-ai-hint={philosophyImage.imageHint}
                />
              )}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold font-headline text-foreground mb-4">Un Equipo que se Preocupa</h2>
              <p className="text-muted-foreground mb-4">
                Nuestra misión va más allá de la medicina. En VetPet Haven, creemos en el vínculo profundo entre las mascotas y sus familias. Por eso, cada miembro de nuestro equipo está comprometido no solo con la excelencia clínica, sino con ofrecer un trato compasivo y cercano. Entendemos que cada paciente es único, y nos esforzamos por crear un ambiente de confianza y tranquilidad tanto para ti como para tu compañero.
              </p>
              <p className="text-muted-foreground">
                Combinamos años de experiencia con una formación continua y la tecnología más avanzada para asegurar diagnósticos precisos y tratamientos efectivos. Tu tranquilidad es nuestra prioridad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline text-foreground">¿Por qué confiar en nosotros?</h2>
            <p className="text-lg text-muted-foreground mt-2">Nuestros clientes y sus mascotas son nuestra mejor carta de presentación.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-background flex flex-col shadow-lg">
                <CardContent className="pt-6 flex-grow">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground/90 mb-4 italic">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter>
                    <div className='text-sm'>
                        <p className='font-bold'>{testimonial.name}</p>
                        <p className='text-muted-foreground'>{testimonial.pet}</p>
                    </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
