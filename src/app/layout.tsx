import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Inter, Poppins } from 'next/font/google';
import GoogleAnalytics from '@/components/analytics/google-analytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://centrovetzoe.com'),
  title: {
    default: 'Centro Veterinario Zoé | Clínica Veterinaria en Caracas — Consultas, Vacunas y Viajes de Mascotas',
    template: '%s | Centro Veterinario Zoé — Caracas, Venezuela'
  },
  description: 'Clínica veterinaria en La Campiña, Caracas, especializada en consultas, vacunación, cirugía, laboratorio y trámites de viajes internacionales para perros y gatos. Gestión INSAI, certificados CEXGAN, pasaportes y permisos zoosanitarios para Europa, EE. UU. y Latinoamérica.',
  keywords: [
    'veterinaria caracas',
    'clínica veterinaria la campiña',
    'veterinario en caracas',
    'veterinaria venezuela',
    'vacunas para perros caracas',
    'vacunas para gatos caracas',
    'tramites internacionales mascotas venezuela',
    'viajar con mascota desde venezuela',
    'viajar con mascota europa',
    'pasaporte para perros venezuela',
    'certificados zoosanitarios insai',
    'certificado CEXGAN mascotas',
    'microchip mascotas caracas',
    'cirugía veterinaria caracas',
    'laboratorio veterinario caracas',
    'peluquería canina caracas',
    'hospitalización mascotas caracas',
    'desparasitación perros gatos',
    'centro veterinario zoé',
  ],
  authors: [{ name: 'M.V. Eduardo Peña Rodríguez' }],
  creator: 'Centro Veterinario Zoé',
  alternates: {
    canonical: 'https://centrovetzoe.com',
    languages: {
      'es-VE': 'https://centrovetzoe.com',
      'x-default': 'https://centrovetzoe.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: 'https://centrovetzoe.com',
    title: 'Centro Veterinario Zoé | Clínica Veterinaria en Caracas — Vacunas, Cirugía y Viajes',
    description: 'Atención veterinaria integral en La Campiña, Caracas. Consultas, vacunación, laboratorio, cirugía y gestión completa de trámites INSAI para viajes internacionales de perros y gatos.',
    siteName: 'Centro Veterinario Zoé',
    images: [{
      url: '/logo.png',
      width: 800,
      height: 600,
      alt: 'Centro Veterinario Zoé — Clínica Veterinaria en Caracas, Venezuela',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Centro Veterinario Zoé | Veterinaria en Caracas',
    description: 'Clínica veterinaria en La Campiña, Caracas. Consultas, vacunas, cirugía y gestión de viajes internacionales para mascotas con certificación INSAI.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

/**
 * Structured data: VeterinaryCare + BreadcrumbList
 * Expanded with sameAs, areaServed, and service catalog
 * for richer Google snippets and authority signals.
 */
const jsonLdVeterinaryCare = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  "name": "Centro Veterinario Zoé",
  "image": "https://centrovetzoe.com/logo.png",
  "logo": "https://centrovetzoe.com/logo.png",
  "description": "Clínica veterinaria en La Campiña, Caracas, especializada en consultas médicas, vacunación, cirugía, laboratorio clínico y gestión integral de trámites zoosanitarios internacionales (INSAI) para perros y gatos.",
  "url": "https://centrovetzoe.com",
  "telephone": "+584125957240",
  "email": "contacto@centrovetzoe.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Mirador con Av. 1, La Campiña",
    "addressLocality": "Caracas",
    "addressRegion": "Distrito Capital",
    "postalCode": "1041",
    "addressCountry": "VE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.4961,
    "longitude": -66.8783
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "currenciesAccepted": "VES, USD",
  "areaServed": {
    "@type": "City",
    "name": "Caracas",
    "containedInPlace": {
      "@type": "Country",
      "name": "Venezuela"
    }
  },
  "sameAs": [
    "https://www.instagram.com/centroveterinariozoe",
    "https://www.tiktok.com/@centroveterianriozoe"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios Veterinarios",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Consulta y Medicina Preventiva",
        "description": "Chequeos integrales, vacunación y planes de desparasitación personalizados"
      },
      {
        "@type": "OfferCatalog",
        "name": "Laboratorio Clínico",
        "description": "Hemogramas, bioquímicas, urianálisis y tests rápidos"
      },
      {
        "@type": "OfferCatalog",
        "name": "Cirugía General",
        "description": "Esterilizaciones, cirugía de tejidos blandos con monitoreo avanzado"
      },
      {
        "@type": "OfferCatalog",
        "name": "Trámites de Viajes Internacionales",
        "description": "Gestión INSAI, certificados CEXGAN, microchips y permisos zoosanitarios"
      },
      {
        "@type": "OfferCatalog",
        "name": "Peluquería Canina y Felina",
        "description": "Baños terapéuticos, cortes de raza y cuidado dermatológico"
      }
    ]
  }
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://centrovetzoe.com" },
    { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://centrovetzoe.com/servicios" },
    { "@type": "ListItem", "position": 3, "name": "Viajes de Mascotas", "item": "https://centrovetzoe.com/viajes" },
    { "@type": "ListItem", "position": 4, "name": "Contacto", "item": "https://centrovetzoe.com/contacto" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* JSON-LD: VeterinaryCare structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdVeterinaryCare) }}
        />
        {/* JSON-LD: BreadcrumbList for navigation structure */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
      </head>
      <body className={cn('font-body antialiased flex flex-col min-h-screen', inter.variable, poppins.variable)}>
        <GoogleAnalytics />
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
