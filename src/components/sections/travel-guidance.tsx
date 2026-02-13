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
  weight: z.string().min(1, "El peso es obligatorio"),
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
    window.print();
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
    <section className="section-padding bg-background min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Header - Hidden on print */}
        <div className="text-center mb-16 max-w-3xl mx-auto print:hidden">
          <div className="inline-block p-4 bg-primary/10 rounded-3xl mb-6">
             <Plane className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline text-foreground mb-6 tracking-tight">Asesoría de Viajes</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Obtén una guía personalizada de requisitos y costos para viajar con tu mascota. Completa el formulario y nosotros nos encargamos del resto.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side - Hidden on print */}
          <div className="lg:col-span-5 print:hidden">
            <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
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
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
                           <User className="h-4 w-4" /> Datos del Propietario
                        </div>
                        <FormField
                        control={form.control}
                        name="ownerName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nombre Completo</FormLabel>
                            <FormControl>
                                <Input placeholder="Tu nombre" className="rounded-xl h-12" {...field} />
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
                                <SelectTrigger className="rounded-xl h-12">
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

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
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
                                <FormControl><Input placeholder="Nombre" className="rounded-xl h-12" {...field} /></FormControl>
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
                                <FormControl><Input placeholder="Ej: Poodle" className="rounded-xl h-12" {...field} /></FormControl>
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
                                <FormControl><Input placeholder="Ej: Blanco" className="rounded-xl h-12" {...field} /></FormControl>
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
                                <FormControl><Input type="number" placeholder="0" className="rounded-xl h-12" {...field} /></FormControl>
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
                                        "w-full h-12 pl-3 text-left font-normal rounded-xl",
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
                "min-h-[600px] border-2 border-dashed border-primary/20 bg-white/50 rounded-3xl transition-all duration-500 relative flex flex-col",
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
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-20 backdrop-blur-sm print:hidden">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-primary font-bold animate-pulse text-xl">Preparando tu presupuesto...</p>
                  </div>
                )}
                
                {result && (
                  <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {/* Visual Header */}
                    <div className="bg-primary p-10 rounded-t-[2rem] text-primary-foreground print:bg-white print:text-black print:border-b-4 print:border-black print:p-0">
                        <div className="flex justify-between items-start mb-6 print:mb-4">
                            <div>
                                <h1 className="hidden print:block text-4xl font-black uppercase mb-2">VETPET HAVEN</h1>
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
                            <div className="rounded-3xl border border-border overflow-hidden bg-white shadow-sm print:border-gray-300 print:shadow-none">
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
                        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 print:bg-white print:border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-amber-900 text-xl flex items-center gap-2">
                                    <Info className="h-6 w-6 text-amber-600 print:hidden" />
                                    Tasas y Aranceles de Exportación
                                </h4>
                                <p className="font-black text-2xl text-amber-900">${result.info.aranceles}</p>
                            </div>
                            <p className="text-amber-800/80 leading-relaxed">
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

      {/* Style for printing */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section, .print-section * {
            visibility: visible;
          }
          #viajes, #viajes * {
            visibility: visible;
          }
          header, footer, .print-hidden, button, .lucide {
            display: none !important;
          }
          #viajes {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white;
            padding: 0 !important;
            margin: 0 !important;
          }
          .container {
            max-width: none !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .lg\\:col-span-7 {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
