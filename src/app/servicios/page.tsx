import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Syringe, Scissors, Beaker, Bone } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle } from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Consultas Generales",
    description: "Atención veterinaria integral para el diagnóstico, tratamiento y seguimiento de la salud de tu mascota. Realizamos exámenes físicos completos y resolvemos todas tus dudas sobre su bienestar.",
  },
  {
    icon: Scissors,
    title: "Cirugías",
    description: "Realizamos una amplia gama de procedimientos quirúrgicos, desde cirugías de tejidos blandos hasta ortopédicas. Contamos con quirófano equipado y un estricto protocolo de esterilización y monitoreo anestésico.",
  },
  {
    icon: Syringe,
    title: "Vacunación y Desparasitación",
    description: "Diseñamos planes de vacunación y desparasitación personalizados según la edad, estilo de vida y riesgos de tu perro o gato, protegiéndolo contra enfermedades infecciosas y parásitos comunes.",
  },
];

const diagnosticServices = [
  {
    id: 'lab-test',
    icon: Beaker,
    title: 'Laboratorio Clínico',
    description: 'Nuestro laboratorio interno nos permite obtener resultados rápidos y precisos para análisis de sangre, orina y otros estudios, lo que facilita un diagnóstico temprano y un tratamiento eficaz. Evaluamos la función de órganos vitales y detectamos enfermedades antes de que los síntomas sean evidentes.',
    features: [
      "Hematología completa",
      "Perfiles bioquímicos",
      "Pruebas de enfermedades infecciosas",
      "Análisis de orina y coprológicos"
    ],
    imageHint: "laboratory science"
  },
  {
    id: 'x-ray',
    icon: Bone,
    title: 'Rayos X Digital',
    description: 'Utilizamos tecnología de radiografía digital para obtener imágenes de alta resolución con una mínima exposición a la radiación. Es una herramienta fundamental para el diagnóstico de problemas óseos, articulares, torácicos y abdominales.',
    features: [
      "Diagnóstico de fracturas y displasias",
      "Evaluación de cuerpos extraños",
      "Estudios de tórax y abdomen",
      "Imágenes claras y rápidas"
    ],
    imageHint: "x-ray medical"
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <section id="servicios" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Nuestros Servicios</h1>
            <p className="text-lg text-muted-foreground mt-2">Dedicados al cuidado integral de la salud de perros y gatos.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.title} className="text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                    <service.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center my-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">Diagnóstico Avanzado</h2>
            <p className="text-lg text-muted-foreground mt-2">Tecnología de punta para un diagnóstico preciso y rápido.</p>
          </div>
          <div className="grid md:grid-cols-1 gap-8 lg:gap-12 items-stretch">
            {diagnosticServices.map(service => {
              const image = PlaceHolderImages.find(p => p.id === service.id);
              return (
                <Card key={service.id} className="flex flex-col md:flex-row items-center overflow-hidden shadow-md">
                  <div className="p-6 md:p-8 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <service.icon className="h-8 w-8 text-primary" />
                      <h3 className="text-2xl font-semibold font-headline">{service.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2 text-sm text-foreground">
                      {service.features.map(feature => (
                         <li key={feature} className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>{feature}</span></li>
                      ))}
                    </ul>
                  </div>
                  {image && (
                    <div className="w-full md:w-1/3 h-64 md:h-full shrink-0">
                      <Image src={image.imageUrl} alt={image.description} width={600} height={400} className="object-cover w-full h-full" data-ai-hint={service.imageHint} />
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
