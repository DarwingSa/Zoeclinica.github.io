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

export default function TravelGuidance() {
  const [result, setResult] = useState<{
    data: TravelFormValues;
    services: ServiceItem[];
    info: DestinationData
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<TravelFormValues>({
    resolver: zodResolver(travelFormSchema),
    defaultValues: {
      ownerName: '',
      petName: '',
      breed: '',
      color: '',
      weight: '',
    },
  });

  function onSubmit(values: TravelFormValues) {
    setIsLoading(true);
    setResult(null);

    // Simulación de procesamiento
    setTimeout(() => {
      const info = destinationServices[values.destination];
      const services = info.getServices(values.species);

      setResult({ data: values, services, info });
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

    const totalServicios = result.services.reduce((acc, s) => acc + s.price, 0);
    const speciesLabel = result.data.species === 'dog' ? 'Perro' : 'Gato';
    const birthDateStr = format(result.data.birthDate, "d 'de' MMMM, yyyy", { locale: es });
    const todayStr = format(new Date(), "d 'de' MMMM, yyyy", { locale: es });

    const servicesRows = result.services.map(s => `
      <tr>
        <td style="padding:9px 12px;border-bottom:1px solid #e5e7eb;">
          <strong style="font-size:13px;">${s.label}</strong><br/>
          <span style="color:#6b7280;font-size:11px;">${s.detail}</span>
        </td>
        <td style="padding:9px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;font-size:16px;color:#0891b2;">$${s.price}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Presupuesto de Viaje - Centro Veterinario Zoé</title>
        <style>
          @page { size: letter; margin: 15mm 16mm; }
          * { margin:0; padding:0; box-sizing:border-box; }
          body { font-family:'Segoe UI',system-ui,-apple-system,sans-serif; color:#1e293b; padding:0; line-height:1.45; font-size:13px; }
          .header { display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #0891b2; padding-bottom:14px; margin-bottom:20px; }
          .logo-area h1 { font-size:18px; color:#0891b2; }
          .logo-area p { font-size:11px; color:#6b7280; }
          .doc-title { text-align:right; }
          .doc-title h2 { font-size:15px; color:#1e293b; }
          .doc-title p { font-size:11px; color:#6b7280; }
          .section { margin-bottom:18px; }
          .section-title { font-size:12px; font-weight:700; color:#0891b2; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:8px; border-bottom:1px solid #e5e7eb; padding-bottom:5px; }
          .info-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px 20px; }
          .info-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:6px 20px; }
          .info-item label { display:block; font-size:10px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; }
          .info-item p { font-size:14px; font-weight:600; margin-bottom:4px; }
          table { width:100%; border-collapse:collapse; margin-top:6px; }
          th { text-align:left; padding:6px 12px; border-bottom:2px solid #0891b2; font-size:11px; color:#6b7280; text-transform:uppercase; }
          th:last-child { text-align:right; }
          .total-row { background:#f0fdfa; }
          .total-row td { padding:10px 12px; font-weight:800; font-size:16px; }
          .total-row td:last-child { color:#0891b2; text-align:right; }
          .fee-box { background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:12px 14px; margin-top:16px; display:flex; justify-content:space-between; align-items:center; }
          .fee-box .fee-label { font-weight:700; color:#92400e; font-size:14px; }
          .fee-box .fee-amount { font-weight:800; font-size:18px; color:#92400e; white-space:nowrap; margin-left:16px; }
          .fee-box .fee-note { font-size:11px; color:#a16207; margin-top:3px; }
          .footer { margin-top:28px; padding-top:12px; border-top:1px solid #e5e7eb; text-align:center; font-size:10px; color:#9ca3af; }
          .footer p { margin-top:4px; }
          .alert-box { background:#fef3c7; border-left:3px solid #f59e0b; padding:8px 12px; border-radius:4px; margin-bottom:16px; font-size:12px; color:#92400e; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-area">
            <h1>🐾 Centro Veterinario Zoé</h1>
            <p>Asesoría de Viajes Internacionales</p>
          </div>
          <div class="doc-title">
            <h2>Presupuesto Referencial</h2>
            <p>Generado el ${todayStr}</p>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Datos del Propietario</div>
          <div class="info-grid-2">
            <div class="info-item"><label>Nombre</label><p>${result.data.ownerName}</p></div>
            <div class="info-item"><label>Destino</label><p>${result.info.title.replace('Presupuesto de Viaje a ', '').replace('Pack Viaje a ', '')}</p></div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Datos de la Mascota</div>
          <div class="info-grid">
            <div class="info-item"><label>Nombre</label><p>${result.data.petName}</p></div>
            <div class="info-item"><label>Especie</label><p>${speciesLabel}</p></div>
            <div class="info-item"><label>Raza</label><p>${result.data.breed}</p></div>
            <div class="info-item"><label>Color</label><p>${result.data.color}</p></div>
            <div class="info-item"><label>Peso</label><p>${result.data.weight} kg</p></div>
            <div class="info-item"><label>Fecha de Nacimiento</label><p>${birthDateStr}</p></div>
          </div>
        </div>

        <div class="alert-box">⏱ <strong>Inicio de trámites:</strong> ${result.info.estimatedTime}</div>

        <div class="section">
          <div class="section-title">Desglose de Servicios Médicos</div>
          <table>
            <thead><tr><th>Servicio</th><th>Costo</th></tr></thead>
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
          <div>
            <div class="fee-label">Tasas y Aranceles de Exportación</div>
            <div class="fee-note">${result.info.arancelesNote}. Corresponde a entidades gubernamentales.</div>
          </div>
          <div class="fee-amount">$${result.info.aranceles}</div>
        </div>

        <div class="footer">
          <p><strong>Centro Veterinario Zoé</strong> — Asesoría de Viajes Internacionales</p>
          <p>Este documento es una estimación referencial. Los precios pueden variar según peso, estado de salud y regulaciones internacionales vigentes.</p>
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

  const handleScheduleAppointment = async () => {
    if (!result) return;
    setIsSending(true);

    // Simulación de envío de datos
    setTimeout(() => {
      toast({
        title: "Solicitud Recibida",
        description: "Un asesor de viajes se pondrá en contacto contigo en las próximas 24 horas.",
      });
      setIsSending(false);
    }, 1500);
  };

  const subtotal = result?.services.reduce((acc, item) => acc + item.price, 0) || 0;

  return (
    <section className="section-padding bg-background min-h-screen relative overflow-hidden">
      {/* Decorative gradient mesh */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none opacity-50" />
      <div className="hidden md:block absolute top-20 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-float-slow pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header - Hidden on print */}
        <div className="text-center mb-16 max-w-3xl mx-auto print:hidden">
          <div className="inline-block p-4 bg-primary/10 rounded-3xl mb-6 group cursor-default">
            <Plane className="h-10 w-10 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline text-foreground mb-6 tracking-tight">Asesoría de <span className="text-gradient">Viajes</span></h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Obtén una guía personalizada de requisitos y costos para viajar con tu mascota. Completa el formulario y nosotros nos encargamos del resto.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Form Side - Hidden on print */}
          <div className="lg:col-span-5 print:hidden">
            <Card className="border border-border/30 shadow-glow-lg bg-card rounded-3xl">
              <CardHeader className="bg-secondary/30 pb-8">
                <CardTitle className='font-headline text-2xl flex items-center gap-3'>
                  <PawPrint className="h-6 w-6 text-primary" />
                  Generar Presupuesto
                </CardTitle>
                <CardDescription className="text-base">
                  Dinos a dónde vas y con quién viajas.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className="space-y-5 bg-secondary/20 dark:bg-secondary/10 p-5 rounded-2xl border border-border/30">
                      <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                        <User className="h-4 w-4" /> Datos del Propietario
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

                    <div className="h-px bg-border/50 my-6" />

                    <div className="space-y-5 bg-secondary/20 dark:bg-secondary/10 p-5 rounded-2xl border border-border/30">
                      <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                        <PawPrint className="h-4 w-4" /> Datos de la Mascota
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

                    <Button type="submit" disabled={isLoading} className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 rounded-2xl group">
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
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7 space-y-8 print:col-span-12">
            <Card ref={resultsRef} className={cn(
              "min-h-[600px] border-2 border-dashed border-primary/20 bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-3xl transition-all duration-500 relative flex flex-col",
              result && "border-solid border-border/30 shadow-glow-lg",
              "print:border-none print:bg-white print:min-h-0"
            )}>
              {!isLoading && !result && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 print:hidden">
                  <div className="bg-primary/5 p-8 rounded-full mb-6">
                    <Banknote className="h-16 w-16 text-primary/30" />
                  </div>
                  <div className="max-w-xs">
                    <h3 className="font-bold text-2xl text-foreground mb-3">Tu Guía de Viaje</h3>
                    <p className="text-muted-foreground">Completa el formulario para generar un presupuesto detallado y los requisitos sanitarios específicos.</p>
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
                  <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {/* Visual Header */}
                    <div className="bg-gradient-to-r from-primary via-[#2aaadd] to-primary bg-[length:200%_100%] animate-gradient-shift p-10 rounded-t-[2rem] text-primary-foreground print:bg-white print:text-black print:border-b-4 print:border-black print:p-0">
                      <div className="flex justify-between items-start mb-6 print:mb-4">
                        <div>
                          <h1 className="hidden print:block text-4xl font-black uppercase mb-2">CENTRO VETERINARIO ZOÉ</h1>
                          <h2 className='text-3xl md:text-4xl font-extrabold font-headline mb-2'>{result.info.title}</h2>
                          <p className="text-primary-foreground/80 text-lg print:text-gray-600">{result.info.description}</p>
                        </div>
                        <div className="hidden md:block bg-white/10 p-4 rounded-2xl backdrop-blur-md print:hidden">
                          <FileText className="h-8 w-8" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 print:bg-gray-50 print:border-gray-300 print:text-black print:grid-cols-2 print:gap-4">
                        <div>
                          <p className="text-white/60 text-xs uppercase font-bold mb-1 print:text-gray-500">Mascota</p>
                          <p className="font-bold">{result.data.petName}</p>
                          <p className="text-sm opacity-80">{result.data.breed}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs uppercase font-bold mb-1 print:text-gray-500">Propietario</p>
                          <p className="font-bold truncate">{result.data.ownerName}</p>
                        </div>
                        <div className="col-span-2 md:col-span-2 text-right">
                          <p className="text-white/60 text-xs uppercase font-bold mb-1 print:text-gray-500">Inicio de Trámite Sugerido</p>
                          <p className="font-bold text-lg">{result.info.estimatedTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 md:p-12 space-y-10 print:p-0 print:mt-8">
                      {/* Services List */}
                      <div className="space-y-6">
                        <h3 className='font-bold text-2xl flex items-center gap-3 text-foreground'>
                          <FileText className="h-6 w-6 text-primary" />
                          Desglose de Servicios Médicos
                        </h3>
                        <div className="rounded-3xl border border-border/50 overflow-hidden bg-card shadow-sm hover:shadow-glow-sm transition-all duration-500 print:border-gray-300 print:shadow-none">
                          <div className="divide-y divide-border print:divide-gray-200">
                            {result.services.map((service, i) => (
                              <div key={i} className="p-6 flex justify-between items-center gap-4 hover:bg-secondary/20 transition-colors">
                                <div>
                                  <p className="font-bold text-lg text-foreground">{service.label}</p>
                                  <p className="text-sm text-muted-foreground">{service.detail}</p>
                                </div>
                                <p className="font-bold text-xl text-primary print:text-black">${service.price}</p>
                              </div>
                            ))}
                            <div className="p-6 bg-secondary/30 flex justify-between items-center print:bg-gray-100">
                              <p className="font-extrabold text-xl">Total Estimado Servicios</p>
                              <p className="font-black text-3xl text-primary print:text-black">${subtotal}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Extra Fees */}
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-3xl p-8 print:bg-white print:border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-bold text-amber-900 dark:text-amber-300 text-xl flex items-center gap-2">
                            <Info className="h-6 w-6 text-amber-600 print:hidden" />
                            Tasas y Aranceles de Exportación
                          </h4>
                          <p className="font-black text-2xl text-amber-900 dark:text-amber-300">${result.info.aranceles}</p>
                        </div>
                        <p className="text-amber-800/80 dark:text-amber-400/80 leading-relaxed">
                          {result.info.arancelesNote}. Este monto corresponde a entidades gubernamentales y no forma parte de los honorarios de la clínica.
                        </p>
                      </div>

                      {/* Final CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border print:hidden">
                        <Button
                          className='flex-grow h-16 text-xl font-bold shadow-2xl rounded-2xl transition-transform active:scale-95'
                          onClick={handleScheduleAppointment}
                          disabled={isSending}
                        >
                          {isSending ? (
                            <>Procesando... <Loader2 className="ml-2 h-6 w-6 animate-spin" /></>
                          ) : (
                            "Agendar Cita y Enviar Presupuesto"
                          )}
                        </Button>

                        <Button variant="outline" className="h-16 px-8 rounded-2xl border-2 hover:bg-secondary transition-colors" onClick={handlePrint} title="Imprimir o Guardar PDF">
                          <Printer className="h-8 w-8" />
                        </Button>
                      </div>

                      <div className="text-center pt-8 border-t border-border/50">
                        <p className="text-sm text-muted-foreground font-medium mb-2">Presupuesto Referencial • Generado el {format(new Date(), "d 'de' MMMM, yyyy", { locale: es })}</p>
                        <p className="text-xs text-muted-foreground/60 max-w-lg mx-auto leading-relaxed">
                          Este documento es una estimación. Los precios finales pueden variar según el peso exacto de la mascota, su estado de salud previo y cambios en regulaciones internacionales.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Print styles removed — printing now handled via dedicated print window in handlePrint */}
    </section>
  );
}
