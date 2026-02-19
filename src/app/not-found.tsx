import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <section className="min-h-[60vh] flex items-center justify-center py-20 relative overflow-hidden">
            {/* Decorative gradient mesh */}
            <div className="absolute inset-0 gradient-mesh pointer-events-none opacity-50" />
            <div className="hidden md:block absolute top-1/4 -right-20 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl animate-float-slow pointer-events-none" />
            <div className="hidden md:block absolute bottom-1/4 -left-20 w-[250px] h-[250px] bg-[#2aaadd]/5 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

            <div className="text-center max-w-lg px-6 relative z-10">
                {/* Decorative 404 */}
                <div className="relative mb-6">
                    <span className="text-[10rem] font-headline font-extrabold leading-none text-gradient select-none opacity-20">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center animate-float">
                        <span className="text-6xl drop-shadow-lg">🐾</span>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">
                    Página no encontrada
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                    Lo sentimos, la página que buscas no existe o fue movida.
                    ¡Pero tu mascota sigue siendo bienvenida!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="shadow-glow-lg hover:shadow-glow-xl">
                        <Link href="/">
                            <Home className="w-5 h-5 mr-2" />
                            Ir al Inicio
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="hover:border-primary/40 hover:text-primary">
                        <Link href="/contacto">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Contactar
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
