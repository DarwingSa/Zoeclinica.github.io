import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-dog-cat');

  return (
    <section id="inicio" className="bg-background section-padding scroll-mt-header pt-28 md:pt-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tighter mb-4">
              Cuidado experto para tus mejores amigos
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              En VetPet Haven, ofrecemos atención veterinaria de la más alta calidad exclusivamente para perros y gatos. Tu tranquilidad y su bienestar son nuestra prioridad.
            </p>
            <Button asChild size="lg" className="shadow-lg">
              <a href="#contacto">Contáctanos</a>
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
  );
}
