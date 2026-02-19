import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Inter, Poppins } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Centro Veterinario Zoé',
  description: 'Centro Veterinario Zoé — Clínica veterinaria especializada en el cuidado integral de perros y gatos.',
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
      <body className={cn('font-body antialiased flex flex-col min-h-screen', inter.variable, poppins.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
