import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Stethoscope, Star, Heart, Medal, Handshake, Scissors, Bone, Syringe, Microscope, PawPrint, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  // URLs de Pexels ajustadas
  const heroImage = {
    // Perros felices corriendo/jugando
    imageUrl: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Perros felices jugando en el parque"
  };
  
  const philosophyImage = {
    // Mantenemos la imagen del veterinario cariñoso, actualizamos el nombre abajo
    imageUrl: "https://images.pexels.com/photos/6234603/pexels-photo-6234603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Veterinario sonriendo con un gato"
  };
  
  const services = [
    {
      icon: Stethoscope,
      title: "Consulta y Medicina Preventiva",
      description: "El pilar de una vida sana. Chequeos integrales y planes preventivos personalizados.",
      id: "preventiva"
    },
    {
      icon: Microscope,
      title: "Laboratorio Clínico",
      description: "Diagnósticos precisos y rápidos con tecnología de vanguardia en la propia clínica.",
      id: "laboratorio"
    },
    {
      icon: Bone,
      title: "Cirugía General",
      description: "Procedimientos seguros con monitoreo avanzado y cuidado postoperatorio dedicado.",
      id: "cirugia"
    },
    {
      icon: PawPrint,
      title: "Hospitalización",
      description: "Cuidado intensivo 24/7 en un ambiente controlado y libre de estrés.",
      id: "hospitalizacion"
    },
    {
      icon: Scissors,
      title: "Peluquería Canina y Felina",
      description: "Estética profesional y cuidado dermatológico para que luzcan radiantes.",
      id: "peluqueria"
    }
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

  const FirstServiceIcon = services[0].icon;

  return (
    <div className="bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section id="inicio" className="relative bg-secondary/30 min-h-[85vh] flex items-center overflow-hidden">
         <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
         <div className="hidden md:block absolute -top-20 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 opacity-60 animate-float"></div>
         <div className="hidden md:block absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -z-10 opacity-40"></div>
           
        <div className="container relative z-10 pt-12 md:pt-0 px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
            <div className="text-center md:text-left space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white shadow-sm border border-primary/10 text-primary text-xs md:text-sm font-medium">
                  <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-primary"></span>
                  </span>
                  Nueva Clínica en la Ciudad
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-headline text-foreground tracking-tight leading-[1.1]">
                Cuidado experto para tus <br className="hidden md:block"/>
                <span className="text-primary relative inline-block">
                    mejores amigos
                    <svg className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                </span>
              </h1>
              
              <p className="text-base md:text-xl text-muted-foreground max-w-[55ch] mx-auto md:mx-0 leading-relaxed font-light">
                En VetPet Haven, combinamos pasión y tecnología para ofrecer la mejor atención veterinaria a perros y gatos. Tu tranquilidad y su bienestar son nuestra prioridad.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start pt-2">
                <Button asChild size="lg" className="shadow-xl shadow-primary/20 text-base md:text-lg h-12 md:h-14 px-6 md:px-8 rounded-full w-full sm:w-auto">
                  <Link href="/contacto">Pedir Cita Ahora</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 text-base md:text-lg h-12 md:h-14 px-6 md:px-8 rounded-full bg-transparent w-full sm:w-auto">
                  <Link href="/servicios">Conocer Servicios</Link>
                </Button>
              </div>

              <div className="pt-6 md:pt-8 border-t border-primary/10 flex items-center justify-center md:justify-start gap-4 md:gap-8 text-muted-foreground">
                <div className="flex flex-col items-center md:items-start">
                  <span className="font-bold text-xl md:text-2xl text-foreground">24/7</span>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold">Emergencias</span>
                </div>
                 <div className="w-px h-8 md:h-10 bg-primary/20"></div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="font-bold text-xl md:text-2xl text-foreground">+10</span>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold">Años Exp.</span>
                </div>
                 <div className="w-px h-8 md:h-10 bg-primary/20"></div>
                 <div className="flex flex-col items-center md:items-start">
                  <span className="font-bold text-xl md:text-2xl text-foreground">100%</span>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold">Compromiso</span>
                </div>
              </div>
            </div>
            
            <div className="relative flex justify-center lg:justify-end mt-8 md:mt-0">
              <div className="relative w-full max-w-md md:max-w-lg">
                <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2rem] rotate-6 blur-sm"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
                    <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover"
                    priority
                    unoptimized
                    />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-white p-3 md:p-4 rounded-2xl shadow-xl animate-bounce hidden md:flex items-center gap-3 md:gap-4 max-w-[180px] md:max-w-[200px] z-10">
                  <div className="bg-green-100 p-2 md:p-3 rounded-full text-green-600">
                    <Heart className="h-5 w-5 md:h-6 md:w-6 fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-xs md:text-sm text-foreground leading-tight">Clientes Felices</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground font-medium">+500 Mascotas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Summary Section */}
      <section id="servicios" className="py-16 md:py-32 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
             <span className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">Nuestros Servicios</span>
             <h2 className="text-3xl md:text-5xl font-bold font-headline text-foreground mb-4 md:mb-6">Todo lo que necesitan en un solo lugar</h2>
             <p className="text-muted-foreground text-base md:text-lg leading-relaxed">Desde chequeos rutinarios hasta intervenciones complejas, contamos con las instalaciones y el equipo humano para cuidar de ellos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="md:col-span-2 group bg-secondary/30 p-6 md:p-10 rounded-3xl border border-border/50 hover:border-primary/30 transition-all duration-300 flex flex-col md:flex-row items-start gap-6 md:gap-8 relative overflow-hidden">
              <div className="bg-white text-primary rounded-2xl p-4 md:p-5 shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <FirstServiceIcon className="h-8 w-8 md:h-10 md:w-10" />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-xl md:text-2xl mb-2 md:mb-3 font-headline text-foreground">{services[0].title}</h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4 md:mb-6 max-w-2xl">{services[0].description}</p>
                <Link href="/servicios" className="inline-flex items-center text-primary font-bold text-sm md:text-base hover:underline decoration-2 underline-offset-4">
                  Ver detalles completos <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {services.slice(1).map((service) => {
              const ServiceIcon = service.icon;
              return (
                <div key={service.id} className="group bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col items-start h-full">
                    <div className="bg-secondary/50 text-primary rounded-2xl p-3 md:p-4 mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <ServiceIcon className="h-6 w-6 md:h-7 md:w-7" />
                    </div>
                    <h4 className="font-bold text-lg md:text-xl mb-2 md:mb-3 font-headline text-foreground">{service.title}</h4>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 md:mb-6 flex-grow">{service.description}</p>
                </div>
              );
            })}
            
            <div className="md:col-span-2 bg-primary rounded-3xl p-8 md:p-12 text-center text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-2xl shadow-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative text-left md:max-w-xl">
                <h3 className="font-bold text-xl md:text-3xl font-headline mb-2">¿Tienes dudas sobre la salud de tu mascota?</h3>
                <p className="text-primary-foreground/80 text-base md:text-lg">Nuestro equipo está listo para asesorarte y brindarte la mejor guía.</p>
              </div>
              <Button asChild size="lg" variant='secondary' className="w-full md:w-auto relative shadow-lg hover:scale-105 transition-transform font-bold h-12 md:h-14 px-8 rounded-full whitespace-nowrap">
                 <Link href="/contacto">Contáctanos Hoy</Link>
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-16 md:py-32 bg-secondary/30 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-px bg-primary/10"></div>
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
             {/* Image Side */}
            <div className="relative order-last md:order-first">
               <div className="hidden md:block absolute inset-0 bg-primary/10 rounded-[2.5rem] rotate-3 transform translate-x-4 translate-y-4 -z-10"></div>
              <div className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl w-full aspect-[4/5] bg-gray-100">
                <Image
                  src={philosophyImage.imageUrl}
                  alt={philosophyImage.description}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized
                />
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-8 text-white">
                    <p className="font-bold text-base md:text-lg mb-1">Dr. Eduardo Peña</p>
                    <p className="text-white/80 text-xs md:text-sm">Médico Veterinario</p>
                  </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6 md:space-y-8">
              <div>
                 <span className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">Nuestra Filosofía</span>
                 <h2 className="text-3xl md:text-5xl font-bold font-headline text-foreground mb-4 md:mb-6">Más que veterinarios, somos amantes de los animales</h2>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Creemos que la medicina veterinaria debe ir acompañada de empatía. Cada diagnóstico y tratamiento se realiza pensando no solo en la salud física, sino en el bienestar emocional de tu mascota y tu tranquilidad.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  { icon: Heart, title: "Trato Compasivo", desc: "Tratamos a cada paciente como si fuera nuestro propio compañero." },
                  { icon: Medal, title: "Excelencia Médica", desc: "Formación continua y protocolos actualizados internacionalmente." },
                  { icon: Handshake, title: "Transparencia Total", desc: "Te explicamos cada paso del proceso de forma clara y honesta." }
                ].map((item, index) => {
                  const ValueIcon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 md:gap-5 p-4 md:p-5 rounded-2xl bg-white shadow-sm border border-transparent hover:border-primary/20 transition-all duration-300">
                      <div className="bg-secondary text-primary p-3 rounded-xl flex-shrink-0">
                        <ValueIcon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-base md:text-lg mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-32 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12 md:mb-20">
             <span className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">Testimonios</span>
            <h2 className="text-3xl md:text-5xl font-bold font-headline text-foreground">Historias de colitas felices</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={testimonial.name} className="bg-secondary/20 border-none shadow-none hover:shadow-lg hover:bg-white transition-all duration-500 p-2 h-full flex flex-col">
                <CardContent className="pt-8 px-6 flex-grow relative">
                  <div className="text-primary/20 absolute top-6 left-6">
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01691 21L5.01691 18C5.01691 16.8954 5.91234 16 7.01691 16H10.0169C10.5692 16 11.0169 15.5523 11.0169 15V9C11.0169 8.44772 10.5692 8 10.0169 8H6.01691C5.46462 8 5.01691 8.44772 5.01691 9V11C5.01691 11.5523 4.56919 12 4.01691 12H3.01691V5H13.0169V15C13.0169 18.3137 10.3306 21 7.01691 21H5.01691Z" /></svg>
                  </div>
                  <p className="text-foreground/80 mb-6 italic text-base md:text-lg leading-relaxed relative z-10 pt-8">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 border-t border-black/5 pt-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg md:text-xl">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className='text-left'>
                            <p className='font-bold text-foreground text-base md:text-lg'>{testimonial.name}</p>
                            <p className='text-muted-foreground text-xs md:text-sm font-medium'>{testimonial.pet}</p>
                        </div>
                    </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
       {/* Pre-Footer CTA */}
       <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container relative z-10 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-4 md:mb-6 tracking-tight text-foreground">¿Listos para darle a tu mejor amigo <br className="hidden md:block"/> el cuidado que merece?</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto font-light">Agenda una cita hoy y únete a la familia de VetPet Haven.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="shadow-xl hover:scale-105 transition-transform font-bold h-12 md:h-14 px-8 md:px-10 text-base md:text-lg rounded-full w-full sm:w-auto">
              <Link href="/contacto">Agenda una Cita</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
