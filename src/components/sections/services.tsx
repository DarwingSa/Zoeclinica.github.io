import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Syringe, Scissors, Plane } from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: "Consultas Generales",
    description: "Atención completa para el diagnóstico y seguimiento de la salud de tu mascota.",
  },
  {
    icon: Scissors,
    title: "Cirugías",
    description: "Procedimientos quirúrgicos con equipos de última generación y personal cualificado.",
  },
  {
    icon: Syringe,
    title: "Vacunación",
    description: "Planes de vacunación personalizados para proteger a tu perro o gato de enfermedades.",
  },
  {
    icon: Plane,
    title: "Trámites de Viaje",
    description: "Asesoría y gestión de certificados y requisitos para viajes internacionales con tu mascota.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-muted section-padding scroll-mt-header">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Nuestros Servicios</h2>
          <p className="text-lg text-muted-foreground mt-2">Dedicados al cuidado integral de perros y gatos.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                  <service.icon className="h-8 w-8" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
