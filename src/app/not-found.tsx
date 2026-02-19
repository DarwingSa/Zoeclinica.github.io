import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <section className="min-h-[60vh] flex items-center justify-center py-12 sm:py-16 md:py-20 relative overflow-hidden">
            {/* Decorative gradient mesh */}
            <div className="absolute inset-0 gradient-mesh pointer-events-none opacity-50" />
            <div className="hidden md:block absolute top-1/4 -right-20 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl animate-float-slow pointer-events-none" />
            <div className="hidden md:block absolute bottom-1/4 -left-20 w-[250px] h-[250px] bg-[#2aaadd]/5 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

            <div className="text-center max-w-lg px-5 sm:px-6 relative z-10">
                {/* Decorative 404 */}
                <div className="relative mb-4 sm:mb-6 animate-fade-up">
                    <span className="text-[7rem] sm:text-[10rem] font-headline font-extrabold leading-none text-gradient select-none opacity-20">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center animate-float">
                        <span className="text-4xl sm:text-5xl md:text-6xl drop-shadow-lg">🐾</span>
                    </div>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground mb-3 sm:mb-4 animate-fade-up delay-100">
                    Página no encontrada
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-8 animate-fade-up delay-200">
                    Lo sentimos, la página que buscas no existe o fue movida.
                    ¡Pero tu mascota sigue siendo bienvenida!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-up delay-300">
                    <Button asChild size="lg" className="shadow-glow-lg hover:shadow-glow-xl h-11 sm:h-12 text-sm sm:text-base">
                        <Link href="/">
                            <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            Ir al Inicio
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="hover:border-primary/40 hover:text-primary h-11 sm:h-12 text-sm sm:text-base">
                        <Link href="/contacto">
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            Contactar
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
