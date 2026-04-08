import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Inter, Poppins } from 'next/font/google';

export const metadata: Metadata = {
  metadataBase: new URL('https://centrovetzoe.com'),
  title: {
    default: 'Centro Veterinario Zoé | Clínica y Trámites de Viajes Internacionales',
    template: '%s | Centro Veterinario Zoé'
  },
  description: 'Clínica veterinaria especializada en el cuidado integral de perros y gatos en Caracas. Servicio experto en documetación, vacunas y gestión para viajes internacionales de mascotas (INSAI, Europa, Norteamérica).',
  keywords: ['veterinaria venezuela', 'tramites internacionales mascotas venezuela', 'clínica veterinaria la campiña', 'pasaporte para perros venezuela', 'viajar con mascota europa', 'certificados zoosanitarios insai', 'vacunas gatos caracas', 'microchip mascotas'],
  authors: [{ name: 'M.V. Eduardo Peña Rodríguez' }],
  creator: 'Centro Veterinario Zoé',
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: 'https://centrovetzoe.com',
    title: 'Centro Veterinario Zoé | Cuidado Médico y Viajes de Mascotas',
    description: 'Expertos en cuidado animal y asesoría legal o sanitaria para viajes internacionales de perros y gatos desde Venezuela.',
    siteName: 'Centro Veterinario Zoé',
    images: [{ url: '/logo.png', width: 800, height: 600, alt: 'Centro Veterinario Zoé Logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'Centro Veterinario Zoé',
    description: 'Clínica veterinaria y gestión de viajes internacionales para mascotas.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VeterinaryCare",
              "name": "Centro Veterinario Zoé",
              "image": "https://centrovetzoe.com/logo.png",
              "description": "Clínica veterinaria en Caracas especializada. Cuidado médico preventivo y gestión integral de trámites zoosanitarios internacionales para mascotas.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Calle Mirador con Av. 1, La Campiña",
                "addressLocality": "Caracas",
                "addressRegion": "Distrito Capital",
                "postalCode": "1041",
                "addressCountry": "VE"
              },
              "telephone": "+584125957240",
              "url": "https://centrovetzoe.com",
              "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-18:00",
              "priceRange": "$$"
            })
          }}
        />
      </head>
      <body className={cn('font-body antialiased flex flex-col min-h-screen', inter.variable, poppins.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark" disableTransitionOnChange>
          <Header />
          <main className="flex-grow pt-20 md:pt-24">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
