'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Plane, PawPrint, CalendarIcon, Banknote, FileText, Printer, User, Info } from 'lucide-react';
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const travelFormSchema = z.object({
  ownerName: z.string().min(2, "El nombre es obligatorio"),
  destination: z.enum(["europa", "norteamerica", "asia", "latinoamerica"], {
    required_error: "Selecciona un destino",
  }),
  petName: z.string().min(1, "El nombre de la mascota es obligatorio"),
  species: z.enum(["dog", "cat"], {
    required_error: "Selecciona perro o gato",
  }),
  breed: z.string().min(2, "La raza es obligatoria"),
  color: z.string().min(2, "El color es obligatorio"),
  birthDate: z.date({
    required_error: "La fecha de nacimiento es obligatoria",
  }),
  weight: z.string()
    .min(1, "El peso es obligatorio")
    .regex(/^\d+(\.\d{1,2})?$/, "Ingresa solo números (ej: 5 o 5.5)"),
});

type TravelFormValues = z.infer<typeof travelFormSchema>;

type ServiceItem = {
  label: string;
  detail: string;
  price: number;
};

type DestinationData = {
  title: string;
  description: string;
  estimatedTime: string;
  alert: string;
  aranceles: number;
  arancelesNote: string;
  getServices: (species: "dog" | "cat") => ServiceItem[];
};

const destinationServices: Record<string, DestinationData> = {
  europa: {
    title: "Presupuesto de Viaje a Europa (UE)",
    description: "Cumplimiento total normativa CEXGAN y UE. Incluye gestión sanitaria completa.",
    estimatedTime: "Mínimo 21 días antes del viaje",
    alert: "Si tu mascota es menor de 3 meses, contáctanos directamente.",
    aranceles: 70,
    arancelesNote: "Pago directo a cuenta del cliente (Tasa Oficial)",
    getServices: (species) => [
      {
        label: "Vacunación Anual Completa",
        detail: species === 'dog'
          ? "Séxtuple + Antirrábica + Desparasitación + KC"
          : "Quíntuple Felina + Antirrábica + Desparasitación",
        price: 100
      },
      {
        label: "Implantación de Microchip",
        detail: "Microchip ISO 11784/11785 Homologado",
        price: 50
      },
      {
        label: "Titulación de Anticuerpos",
        detail: "Toma de muestra y envío a laboratorio autorizado",
        price: 200
      },
      {
        label: "Certificado Oficial Salud UE",
        detail: "Gestión y emisión ante autoridades competentes",
        price: 150
      }
    ]
  },
  norteamerica: {
    title: "Pack Viaje a Norteamérica",
    description: "Gestión completa de requisitos CDC (EE.UU.) o CFIA (Canadá).",
    estimatedTime: "Iniciar 30 días antes",
    alert: "Nuevos requisitos estrictos para el ingreso a EE.UU.",
    aranceles: 50,
    arancelesNote: "Tasas administrativas de exportación",
    getServices: (species) => [
      { label: "Certificado Salud Internacional", detail: "Emisión oficial 10 días antes", price: 150 },
      { label: "Vacunación y Microchip", detail: "Rabia + Anual + Chip Compatible", price: 120 },
      { label: "Tratamiento Antiparasitario", detail: "Interna y Externa Certificada", price: 30 }
    ]
  },
  asia: {
    title: "Pack Viaje a Asia",
    description: "Protocolo completo para países con requisitos de cuarentena.",
    estimatedTime: "4-6 meses antes del viaje",
    alert: "Proceso largo. Requiere titulación de anticuerpos obligatoria.",
    aranceles: 100,
    arancelesNote: "Permisos de importación y gestiones externas",
    getServices: (species) => [
      { label: "Pack Integral Asia", detail: "Microchip + Vacunas + Titulación + Permisos", price: 650 }
    ]
  },
  latinoamerica: {
    title: "Pack Viaje a Latinoamérica",
    description: "Certificados de exportación para países de la región.",
    estimatedTime: "15-20 días antes",
    alert: "Puede requerir legalizaciones adicionales.",
    aranceles: 40,
    arancelesNote: "Tasas y Aranceles locales (INSAI o similar)",
    getServices: (species) => [
      { label: "Certificado Internacional", detail: "Emisión y gestión oficial", price: 120 },
      { label: "Vacunas y Desparasitación", detail: "Al día según requisito país de destino", price: 80 }
    ]
  }
};

import { NAV_LINKS, CLINIC_INFO } from '@/lib/constants';

const contactFormSchema = z.object({
  contactName: z.string().min(2, "El nombre es obligatorio"),
  contactPhone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  contactEmail: z.string().email("Correo electrónico inválido"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type TravelResult = {
  data: TravelFormValues;
  services: ServiceItem[];
  info: DestinationData;
  total: number;
};

export default function TravelGuidance() {
  const [result, setResult] = useState<TravelResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<TravelFormValues>({
    resolver: zodResolver(travelFormSchema),
    defaultValues: {
      ownerName: "",
      petName: "",
      species: "dog", // Corrected from petSpecies
      weight: "", // Corrected from petWeight
      destination: "europa", // Corrected from ue
      birthDate: undefined, // Corrected from travelDate
      breed: "",
      color: "",
    },
  });

  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactName: "",
      contactPhone: "",
      contactEmail: "",
    },
  });

  function onSubmit(values: TravelFormValues) {
    setIsLoading(true);
    setResult(null);

    // Simulación de procesamiento
    setTimeout(() => {
      const info = destinationServices[values.destination];
      const services = info.getServices(values.species);
      const total = services.reduce((acc, s) => acc + s.price, 0) + info.aranceles + 20; // Added 20 for INSAI

      setResult({ data: values, services, info, total }); // Add total to result
      setIsLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

      toast({
        title: "¡Presupuesto Generado!",
        description: "Revisa los detalles a la derecha para tu viaje.",
      });
    }, 1000);
  }

  const handlePrint = () => {
    if (!result) return;
    // Build a clean printable document with all form data + budget
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const origin = window.location.origin;
    const totalServicios = result.services.reduce((acc, s) => acc + s.price, 0);
    const speciesLabel = result.data.species === 'dog' ? 'Perro' : 'Gato';
    const birthDateStr = format(result.data.birthDate, "d 'de' MMMM, yyyy", { locale: es });
    const todayStr = format(new Date(), "d 'de' MMMM, yyyy", { locale: es });

    const servicesRows = result.services.map(s => `
      <tr>
        <td class="service-name">
          <strong>${s.label}</strong><br/>
          <span>${s.detail}</span>
        </td>
        <td class="service-price">$${s.price}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Presupuesto Referencial - Centro Veterinario Zoé</title>
        <style>
          @page { size: letter; margin: 12mm 15mm; }
          * { margin:0; padding:0; box-sizing:border-box; }
          body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #1e293b; line-height: 1.4; font-size: 13px; max-width: 100%; margin: 0 auto; padding: 0; }
          
          /* Header */
          .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 3px solid #0891b2; padding-bottom: 12px; margin-bottom: 24px; }
          .logo-area { display: flex; align-items: center; gap: 12px; }
          .logo-area img { width: 50px; height: 50px; object-fit: contain; } /* Smaller logo */
          .logo-text h1 { font-size: 16px; color: #0891b2; font-weight: 800; margin-bottom: 2px; letter-spacing: -0.5px; }
          .logo-text p { font-size: 12px; color: #475569; }
          .doc-meta { text-align: right; }
          .doc-meta h2 { font-size: 12px; color: #0f172a; font-weight: 700; margin-bottom: 2px; }
          .doc-meta p { font-size: 12px; color: #64748b; }

          /* Sections */
          .section { margin-bottom: 20px; }
          .section-title { font-size: 12px; font-weight: 800; color: #0891b2; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px; }
          
          /* Grids */
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 24px; }
          .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px 24px; }
          
          .data-item label { display: block; font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 2px; }
          .data-item p { font-size: 14px; font-weight: 600; color: #0f172a; }

          /* Alert */
          .alert-box { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #c2410c; margin-bottom: 20px; border-left: 4px solid #fb923c; padding-left: 12px; }
          .alert-box svg { width: 16px; height: 16px; }
          
          /* Table */
          table { width: 100%; border-collapse: collapse; margin-top: 8px; }
          th { text-align: left; padding: 8px 10px; border-bottom: 2px solid #0891b2; font-size: 11px; color: #0f172a; text-transform: uppercase; font-weight: 800; }
          th.right { text-align: right; }
          td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; } 
          .service-name strong { font-size: 14px; color: #0f172a; display: block; margin-bottom: 2px; }
          .service-name span { font-size: 11px; color: #64748b; }
          .service-price { text-align: right; font-weight: 800; font-size: 16px; color: #0891b2; }
          
          /* Totals */
          .total-row td { padding: 8px 10px; font-weight: 800; font-size: 14px; color: #0f172a; background: #f8fafc; border-bottom: none; }
          .total-row td:last-child { color: #0891b2; text-align: right; font-size: 16px; }
          
          /* Fees */
          .fee-box { border: 1px solid #fde047; border-radius: 8px; padding: 14px 18px; margin-top: 16px; display: flex; justify-content: space-between; align-items: center; background: #fffbeb; }
          .fee-info h4 { font-size: 14px; color: #b45309; font-weight: 700; margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
          .fee-info p { font-size: 12px; color: #b45309; opacity: 0.9; }
          .fee-amount { font-size: 14px; font-weight: 800; color: #b45309; }
          
          /* Footer */
          .print-footer { margin-top: 24px; text-align: center; color: #64748b; font-size: 10px; border-top: 1px solid #e2e8f0; padding-top: 12px; }
          .print-footer strong { color: #475569; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-area">
            <img src="${origin}/logo.png" alt="Centro Veterinario Zoé" />
            <div class="logo-text">
              <h1>Centro Veterinario Zoé</h1>
              <p>Asesoría de Viajes Internacionales</p>
            </div>
          </div>
          <div class="doc-meta">
            <h2>Presupuesto Referencial</h2>
            <p>Generado el ${todayStr}</p>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Datos del Propietario</div>
          <div class="grid-2">
            <div class="data-item"><label>Nombre</label><p>${result.data.ownerName}</p></div>
            <div class="data-item"><label>Destino</label><p>${result.info.title.replace('Presupuesto de Viaje a ', '').replace('Pack Viaje a ', '')}</p></div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Datos de la Mascota</div>
          <div class="grid-3">
            <div class="data-item"><label>Nombre</label><p>${result.data.petName}</p></div>
            <div class="data-item"><label>Especie</label><p>${speciesLabel}</p></div>
            <div class="data-item"><label>Raza</label><p>${result.data.breed}</p></div>
            <div class="data-item"><label>Color</label><p>${result.data.color}</p></div>
            <div class="data-item"><label>Peso</label><p>${result.data.weight} kg</p></div>
            <div class="data-item"><label>Fecha de Nacimiento</label><p>${birthDateStr}</p></div>
          </div>
        </div>

        <div class="alert-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <strong>Inicio de trámites:</strong> ${result.info.estimatedTime}
        </div>

        <div class="section">
          <div class="section-title">Desglose de Servicios Médicos</div>
          <table>
            <thead>
              <tr>
                <th>Servicio</th>
                <th class="right">Costo</th>
              </tr>
            </thead>
            <tbody>
              ${servicesRows}
              <tr class="total-row">
                <td>Total Estimado Servicios</td>
                <td>$${totalServicios}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="fee-box">
          <div class="fee-info">
            <h4>Tasas y Aranceles de Exportación</h4>
            <p>${result.info.arancelesNote}. Corresponde a entidades gubernamentales.</p>
          </div>
          <div class="fee-amount">$${result.info.aranceles}</div>
        </div>

        <div class="fee-box" style="margin-top: 8px;">
          <div class="fee-info">
            <h4>Aranceles del INSAI</h4>
            <p>Destinado a trámites de aeropuertos. Pago directo a cuenta del cliente (Tasa Oficial). No forma parte de los honorarios de la clínica.</p>
          </div>
          <div class="fee-amount">$20</div>
        </div>

        <div class="print-footer">
          <p><strong>Centro Veterinario Zoé</strong> — Asesoría de Viajes Internacionales</p>
          <p>Este documento es una estimación referencial. Los precios finales pueden variar según peso, estado de salud y regulaciones internacionales vigentes.</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const handleScheduleAppointment = () => {
    if (!result) return;
    // Open the contact modal instead of sending directly
    setIsContactModalOpen(true);
  };

  const onContactSubmit = async (contactData: ContactFormValues) => {
    if (!result) return;
    setIsSending(true);

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const subtotalMedicos = result.services.reduce((acc, s) => acc + s.price, 0);

    // Build plain text message using standard emojis (some systems strip custom markdown emojis)
    const rawMessage = `¡Hola! Mi nombre es *${contactData.contactName}*.
Me gustaría agendar una cita para tramitar el certificado de viaje de mi mascota. A continuación, comparto los detalles de nuestro viaje:

🐾 *Datos de la Mascota*
• Nombre: ${result.data.petName}
• Especie: ${result.data.species === 'dog' ? 'Perro' : 'Gato'}
• Peso: ${result.data.weight} kg
• Fecha de Nacimiento: ${format(result.data.birthDate, 'dd/MM/yyyy')}

✈️ *Detalles del Viaje*
• Destino: ${result.info.title.replace('Presupuesto de Viaje a ', '').replace('Pack Viaje a ', '')}
• Propietario/a: ${result.data.ownerName}

📱 *Mi Información de Contacto*
• Teléfono: ${contactData.contactPhone}
• Correo: ${contactData.contactEmail}

💰 *Desglose del Presupuesto*
• Gastos Médicos (Clínica): $${subtotalMedicos}
• Tasas Gubernamentales: $${result.info.aranceles}
• Aranceles del INSAI (Aeropuertos): $20
*Total Estimado:* $${result.total}

Quedo atento/a para coordinar la disponibilidad. ¡Muchas gracias!`;

    // Ensure strict URI encoding and explicit replacement of symbols where some clients drop them
    const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;
    window.open(whatsappUrl, '_blank');

    setIsSending(false);
    setIsContactModalOpen(false);
    contactForm.reset();
  };

  const subtotal = result?.services.reduce((acc, item) => acc + item.price, 0) || 0;

  return (
    <section className="section-padding bg-background min-h-screen relative overflow-hidden">
      {/* Decorative gradient mesh */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none opacity-50" />
      <div className="hidden md:block absolute top-20 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-float-slow pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header - Hidden on print */}
        <ScrollReveal direction="up" className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto print:hidden">
          <div className="inline-block p-3 sm:p-4 bg-primary/10 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 group cursor-default">
            <Plane className="h-8 w-8 sm:h-10 sm:w-10 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold font-headline text-foreground mb-4 sm:mb-6 tracking-tight">Asesoría de <span className="text-gradient">Viajes</span></h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Obtén una guía personalizada de requisitos y costos para viajar con tu mascota. Completa el formulario y nosotros nos encargamos del resto.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 md:gap-8 items-start">

          {/* Form Side - Hidden on print */}
          <ScrollReveal direction="left" className="lg:col-span-5 print:hidden">
            <Card className="border border-border/30 shadow-glow-lg bg-card rounded-2xl sm:rounded-3xl">
              <CardHeader className="bg-secondary/30 pb-5 sm:pb-8">
                <CardTitle className='font-headline text-lg sm:text-xl md:text-2xl flex items-center gap-2 sm:gap-3'>
                  <PawPrint className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  Generar Presupuesto
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Dinos a dónde vas y con quién viajas.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-5 sm:pt-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className="space-y-4 sm:space-y-5 bg-secondary/20 dark:bg-secondary/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-border/30">
                      <div className="flex items-center gap-2 text-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                        <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Datos del Propietario
                      </div>
                      <FormField
                        control={form.control}
                        name="ownerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu nombre completo" className="rounded-xl h-12 bg-background/60 focus:bg-background transition-colors" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Región de Destino</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="rounded-xl h-12 bg-background/60">
                                  <SelectValue placeholder="Selecciona el destino" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="europa">Europa (Unión Europea)</SelectItem>
                                <SelectItem value="norteamerica">Norteamérica (EE.UU. / Canadá)</SelectItem>
                                <SelectItem value="latinoamerica">Latinoamérica</SelectItem>
                                <SelectItem value="asia">Asia</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="h-px bg-border/50 my-4 sm:my-6" />

                    <div className="space-y-4 sm:space-y-5 bg-secondary/20 dark:bg-secondary/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-border/30">
                      <div className="flex items-center gap-2 text-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                        <PawPrint className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Datos de la Mascota
                      </div>

                      <FormField
                        control={form.control}
                        name="species"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>¿Qué mascota viaja?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex gap-6 mt-2"
                              >
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl><RadioGroupItem value="dog" /></FormControl>
                                  <FormLabel className="font-medium cursor-pointer">Perro</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl><RadioGroupItem value="cat" /></FormControl>
                                  <FormLabel className="font-medium cursor-pointer">Gato</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="petName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre</FormLabel>
                              <FormControl><Input placeholder="Nombre de tu mascota" className="rounded-xl h-12 bg-background/60 focus:bg-background transition-colors" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="breed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Raza</FormLabel>
                              <FormControl><Input placeholder="Ej: Poodle" className="rounded-xl h-12 bg-background/60 focus:bg-background transition-colors" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color</FormLabel>
                              <FormControl><Input placeholder="Ej: Blanco" className="rounded-xl h-12 bg-background/60 focus:bg-background transition-colors" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Peso (kg)</FormLabel>
                              <FormControl>
                                <Input
                                  inputMode="decimal"
                                  pattern="[0-9]*\.?[0-9]*"
                                  placeholder="Ej: 5"
                                  className="rounded-xl h-12 bg-background/60 focus:bg-background transition-colors"
                                  {...field}
                                  onKeyDown={(e) => {
                                    // Allow: backspace, delete, tab, escape, enter, arrows, period/comma
                                    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', '.', ','];
                                    if (allowedKeys.includes(e.key)) return;
                                    // Allow Ctrl/Cmd + A, C, V, X
                                    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) return;
                                    // Block anything that isn't a digit
                                    if (!/^\d$/.test(e.key)) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onPaste={(e) => {
                                    const pastedText = e.clipboardData.getData('text');
                                    if (!/^\d+(\.\d*)?$/.test(pastedText)) {
                                      e.preventDefault();
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Fecha de Nacimiento</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full h-12 pl-3 text-left font-normal rounded-xl bg-background/60",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: es })
                                    ) : (
                                      <span>Seleccionar fecha</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("2000-01-01")
                                  }
                                  initialFocus
                                  locale={es}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold shadow-xl shadow-primary/20 rounded-xl sm:rounded-2xl group">
                      {isLoading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <Plane className="mr-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      )}
                      Generar Guía de Viaje
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Results Side */}
          <ScrollReveal direction="right" delay={200} className="lg:col-span-7 space-y-6 sm:space-y-8 print:col-span-12">
            <Card ref={resultsRef} className={cn(
              "min-h-[400px] sm:min-h-[500px] md:min-h-[600px] border-2 border-dashed border-primary/20 bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl transition-all duration-500 relative flex flex-col",
              result && "border-solid border-border/30 shadow-glow-lg",
              "print:border-none print:bg-white print:min-h-0"
            )}>
              {!isLoading && !result && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-8 md:p-12 print:hidden">
                  <div className="bg-primary/5 p-5 sm:p-6 md:p-8 rounded-full mb-4 sm:mb-6">
                    <Banknote className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-primary/30" />
                  </div>
                  <div className="max-w-xs">
                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-foreground mb-2 sm:mb-3">Tu Guía de Viaje</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Completa el formulario para generar un presupuesto detallado y los requisitos sanitarios específicos.</p>
                  </div>
                </div>
              )}

              <CardContent className={cn('p-0', !result && 'invisible')}>
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 z-20 backdrop-blur-sm print:hidden">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-primary font-bold animate-pulse text-xl">Preparando tu presupuesto...</p>
                  </div>
                )}

                {result && (
                  <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                    {/* Visual Header */}
                    <div className="bg-gradient-to-r from-primary via-[#2aaadd] to-primary bg-[length:200%_100%] animate-gradient-shift p-5 sm:p-7 md:p-10 rounded-t-[1.5rem] sm:rounded-t-[2rem] text-primary-foreground print:bg-white print:text-black print:border-b-4 print:border-black print:p-0">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6 print:mb-4 gap-3">
                        <div>
                          <h1 className="hidden print:block text-4xl font-black uppercase mb-2">CENTRO VETERINARIO ZOÉ</h1>
                          <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-headline mb-1.5 sm:mb-2'>{result.info.title}</h2>
                          <p className="text-primary-foreground/80 text-sm sm:text-base md:text-lg print:text-gray-600">{result.info.description}</p>
                        </div>
                        <div className="hidden md:block bg-white/10 p-4 rounded-2xl backdrop-blur-md print:hidden">
                          <FileText className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 bg-white/10 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/20 print:bg-gray-50 print:border-gray-300 print:text-black print:grid-cols-2 print:gap-4">
                        <div>
                          <p className="text-white/60 text-[10px] sm:text-xs uppercase font-bold mb-0.5 sm:mb-1 print:text-gray-500">Mascota</p>
                          <p className="font-bold text-sm sm:text-base">{result.data.petName}</p>
                          <p className="text-xs sm:text-sm opacity-80">{result.data.breed}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-[10px] sm:text-xs uppercase font-bold mb-0.5 sm:mb-1 print:text-gray-500">Propietario</p>
                          <p className="font-bold text-sm sm:text-base truncate">{result.data.ownerName}</p>
                        </div>
                        <div className="col-span-2 md:col-span-2 text-left sm:text-right">
                          <p className="text-white/60 text-[10px] sm:text-xs uppercase font-bold mb-0.5 sm:mb-1 print:text-gray-500">Inicio de Trámite Sugerido</p>
                          <p className="font-bold text-sm sm:text-base md:text-lg">{result.info.estimatedTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 md:p-8 lg:p-12 space-y-6 sm:space-y-8 md:space-y-10 print:p-0 print:mt-8">
                      {/* Services List */}
                      <div className="space-y-4 sm:space-y-6">
                        <h3 className='font-bold text-lg sm:text-xl md:text-2xl flex items-center gap-2 sm:gap-3 text-foreground'>
                          <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          Desglose de Servicios Médicos
                        </h3>
                        <div className="rounded-2xl sm:rounded-3xl border border-border/50 overflow-hidden bg-card shadow-sm hover:shadow-glow-sm transition-all duration-500 print:border-gray-300 print:shadow-none">
                          <div className="divide-y divide-border print:divide-gray-200">
                            {result.services.map((service, i) => (
                              <div key={i} className="p-4 sm:p-5 md:p-6 flex justify-between items-center gap-3 sm:gap-4 hover:bg-secondary/20 transition-colors">
                                <div className="min-w-0">
                                  <p className="font-bold text-sm sm:text-base md:text-lg text-foreground">{service.label}</p>
                                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{service.detail}</p>
                                </div>
                                <p className="font-bold text-base sm:text-lg md:text-xl text-primary print:text-black">${service.price}</p>
                              </div>
                            ))}
                            <div className="p-4 sm:p-5 md:p-6 bg-secondary/30 flex justify-between items-center print:bg-gray-100">
                              <p className="font-extrabold text-base sm:text-lg md:text-xl">Total Estimado Servicios</p>
                              <p className="font-black text-xl sm:text-2xl md:text-3xl text-primary print:text-black">${result.services.reduce((acc, s) => acc + s.price, 0)}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Extra Fees */}
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 print:bg-white print:border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
                          <h4 className="font-bold text-amber-900 dark:text-amber-300 text-base sm:text-lg md:text-xl flex items-center gap-2">
                            <Info className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 print:hidden" />
                            Tasas y Aranceles de Exportación
                          </h4>
                          <p className="font-black text-xl sm:text-2xl text-amber-900 dark:text-amber-300">${result.info.aranceles}</p>
                        </div>
                        <p className="text-amber-800/80 dark:text-amber-400/80 leading-relaxed text-sm sm:text-base">
                          {result.info.arancelesNote}. Este monto corresponde a entidades gubernamentales y no forma parte de los honorarios de la clínica.
                        </p>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 mt-4 print:bg-white print:border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
                          <h4 className="font-bold text-amber-900 dark:text-amber-300 text-base sm:text-lg md:text-xl flex items-center gap-2">
                            <Info className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 print:hidden" />
                            Aranceles del INSAI (Aeropuertos)
                          </h4>
                          <p className="font-black text-xl sm:text-2xl text-amber-900 dark:text-amber-300">$20</p>
                        </div>
                        <p className="text-amber-800/80 dark:text-amber-400/80 leading-relaxed text-sm sm:text-base">
                          Destinado a trámites de aeropuertos. Pago directo a cuenta del cliente (Tasa Oficial). Este monto corresponde a entidades gubernamentales y no forma parte de los honorarios de la clínica.
                        </p>
                      </div>

                      {/* Total Breakdown */}
                      <div className="rounded-2xl sm:rounded-3xl border border-border/50 overflow-hidden bg-card shadow-sm hover:shadow-glow-sm transition-all duration-500 print:border-gray-300 print:shadow-none p-4 sm:p-5 md:p-6">
                        <h3 className='font-bold text-lg sm:text-xl md:text-2xl flex items-center gap-2 sm:gap-3 text-foreground mb-4'>
                          <Banknote className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          Resumen del Presupuesto
                        </h3>
                        <div className="flex justify-between items-center text-sm mb-2 text-muted-foreground">
                          <span>Subtotal Servicios de Clínica:</span>
                          <span className="font-semibold">${result.services.reduce((acc, s) => acc + s.price, 0)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-4 text-muted-foreground pb-4 border-b border-border/10">
                          <span>Tasas y Aranceles de Exportación:</span>
                          <span className="font-semibold">${result.info.aranceles}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-4 text-muted-foreground pb-4 border-b border-border/10">
                          <span>Aranceles del INSAI (Aeropuertos):</span>
                          <span className="font-semibold">$20</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-lg md:text-xl text-primary">
                          <span>Total Estimado:</span>
                          <span className="text-secondary dark:text-secondary-foreground glow-text">${result.total}</span>
                        </div>
                      </div>

                      {/* Final CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-5 sm:pt-6 md:pt-8 border-t border-border print:hidden">
                        <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              className='flex-grow min-h-[3rem] h-auto py-3 sm:py-4 md:py-5 px-4 text-sm sm:text-base md:text-xl font-bold shadow-2xl rounded-xl sm:rounded-2xl transition-transform active:scale-95 whitespace-normal break-words text-balance'
                              onClick={handleScheduleAppointment}
                            >
                              Agendar Cita y Enviar Presupuesto
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md bg-card border-border/50">
                            <DialogHeader>
                              <DialogTitle className="text-xl sm:text-2xl font-headline flex items-center gap-2">
                                <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                Datos de Contacto
                              </DialogTitle>
                              <DialogDescription>
                                Déjanos tus datos para coordinar la cita y enviarte la información.
                              </DialogDescription>
                            </DialogHeader>

                            <Form {...contactForm}>
                              <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4 py-4">
                                <FormField
                                  control={contactForm.control}
                                  name="contactName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Nombre y Apellido</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Tu nombre" {...field} className="h-10 sm:h-11" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={contactForm.control}
                                  name="contactPhone"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Teléfono / WhatsApp</FormLabel>
                                      <FormControl>
                                        <Input placeholder="+58 412..." {...field} className="h-10 sm:h-11" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={contactForm.control}
                                  name="contactEmail"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Correo Electrónico</FormLabel>
                                      <FormControl>
                                        <Input placeholder="tu@email.com" {...field} className="h-10 sm:h-11" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <DialogFooter className="gap-2 sm:gap-0 mt-4">
                                  <Button type="button" variant="outline" onClick={() => setIsContactModalOpen(false)}>
                                    Cancelar
                                  </Button>
                                  <Button type="submit" disabled={isSending}>
                                    {isSending ? (
                                      <>Enviando... <Loader2 className="ml-2 h-4 w-4 animate-spin" /></>
                                    ) : (
                                      <>Enviar a WhatsApp <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="ml-2 h-4 w-4" /></>
                                    )}
                                  </Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" className="h-12 sm:h-14 md:h-16 px-6 sm:px-8 rounded-xl sm:rounded-2xl border-2 hover:bg-secondary transition-colors" onClick={handlePrint} title="Imprimir o Guardar PDF">
                          <Printer className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                        </Button>
                      </div>

                      <div className="text-center pt-5 sm:pt-6 md:pt-8 border-t border-border/50">
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1.5 sm:mb-2">Presupuesto Referencial • Generado el {format(new Date(), "d 'de' MMMM, yyyy", { locale: es })}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground/60 max-w-lg mx-auto leading-relaxed">
                          Este documento es una estimación. Los precios finales pueden variar según el peso exacto de la mascota, su estado de salud previo y cambios en regulaciones internacionales.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>

      {/* Print styles removed — printing now handled via dedicated print window in handlePrint */}
    </section>
  );
}
