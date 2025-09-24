import { Beaker, Bone, CheckCircle } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "../ui/card";

export default function Diagnostics() {
  const labImage = PlaceHolderImages.find(p => p.id === 'lab-test');
  const xrayImage = PlaceHolderImages.find(p => p.id === 'x-ray');

  return (
    <section id="diagnostico" className="bg-background section-padding scroll-mt-header">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Diagnóstico Avanzado</h2>
          <p className="text-lg text-muted-foreground mt-2">Tecnología de punta para un diagnóstico preciso y rápido.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          <Card className="flex flex-col lg:flex-row items-center overflow-hidden">
            <div className="p-6 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Beaker className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-semibold">Laboratorio Clínico</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Análisis de sangre, orina y otros estudios para evaluar la salud interna de tu mascota y detectar enfermedades a tiempo.
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Hematología completa</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Perfiles bioquímicos</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Pruebas de enfermedades infecciosas</span></li>
              </ul>
            </div>
            {labImage && (
              <div className="w-full lg:w-48 xl:w-64 h-48 lg:h-full shrink-0">
                <Image src={labImage.imageUrl} alt={labImage.description} width={600} height={400} className="object-cover w-full h-full" data-ai-hint={labImage.imageHint} />
              </div>
            )}
          </Card>

          <Card className="flex flex-col lg:flex-row items-center overflow-hidden">
            <div className="p-6 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Bone className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-semibold">Rayos X Digital</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Imágenes de alta resolución para una evaluación detallada de huesos, articulaciones y órganos internos con mínima exposición.
              </p>
               <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Diagnóstico de fracturas y displasias</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Evaluación de cuerpos extraños</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Estudios de tórax y abdomen</span></li>
              </ul>
            </div>
            {xrayImage && (
              <div className="w-full lg:w-48 xl:w-64 h-48 lg:h-full shrink-0">
                <Image src={xrayImage.imageUrl} alt={xrayImage.description} width={600} height={400} className="object-cover w-full h-full" data-ai-hint={xrayImage.imageHint} />
              </div>
            )}
          </Card>

        </div>
      </div>
    </section>
  );
}
