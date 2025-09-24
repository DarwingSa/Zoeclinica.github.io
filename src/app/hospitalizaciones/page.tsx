import Image from "next/image";
import { HeartPulse, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const hospitalFeatures = [
    {
        icon: HeartPulse,
        title: "Monitoreo Constante",
        description: "Nuestro equipo vigila permanentemente a los pacientes hospitalizados, utilizando equipos de monitoreo avanzado para controlar sus signos vitales y garantizar una respuesta rápida ante cualquier cambio.",
    },
    {
        icon: ShieldCheck,
        title: "Ambiente Seguro y Cómodo",
        description: "Las áreas de hospitalización están diseñadas para ser tranquilas, seguras e higiénicas, reduciendo el estrés y promoviendo una pronta recuperación. Contamos con espacios separados para perros y gatos.",
    },
    {
        icon: Users,
        title: "Políticas de Visita",
        description: "Entendemos la importancia de tu compañía. Coordinamos horarios de visita para que puedas pasar tiempo con tu mascota, contribuyendo positivamente a su recuperación emocional.",
    },
];

export default function HospitalizationPage() {
    const hospitalizationImage = {
        imageUrl: "https://images.unsplash.com/photo-1581091224674-9b22df3e2f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8dmV0ZXJpbmFyaWFufGVufDB8fHx8MTc1ODcwNDY1MXww&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Veterinario cuidando a un perro en una jaula de hospitalización",
        imageHint: "veterinarian hospitalization"
    };

    return (
        <section id="hospitalizaciones" className="section-padding">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">Servicio de Hospitalización</h1>
                    <p className="text-lg text-muted-foreground mt-2">Cuidado intensivo y especializado para cuando más lo necesitan.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div className="flex justify-center">
                        <Image
                            src={hospitalizationImage.imageUrl}
                            alt={hospitalizationImage.description}
                            width={800}
                            height={600}
                            className="rounded-lg shadow-2xl object-cover"
                            data-ai-hint={hospitalizationImage.imageHint}
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Atención Dedicada 24/7</h2>
                        <p className="text-muted-foreground mb-6">
                            Cuando una mascota requiere cuidados intensivos o una recuperación postoperatoria vigilada, nuestro servicio de hospitalización ofrece un entorno seguro y profesional. Nuestro equipo está preparado para administrar tratamientos, monitorear la evolución y brindar el confort que tu compañero necesita para recuperarse.
                        </p>
                        <Button asChild size="lg">
                            <Link href="/contacto">Consulta con un especialista</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {hospitalFeatures.map((feature) => (
                        <div key={feature.title} className="p-6 border rounded-lg bg-muted/50">
                             <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
