'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Loader2, Sparkles, Wand2, Plane, ChevronDown } from 'lucide-react';
import Link from 'next/link';

import { travelGuidanceSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { contactFormSchema } from '@/lib/schema';
import { useToast } from '@/hooks/use-toast';


type TravelGuidanceFormValues = z.infer<typeof travelGuidanceSchema>;
type ContactFormValues = z.infer<typeof contactFormSchema>;

const travelGuides = {
  europa: {
    dog: {
      title: "Guía de Viaje para Perros a Europa",
      basePrice: "Desde $500 USD",
      requirements: [
        "Microchip ISO 11784/11785.",
        "Vacuna antirrábica vigente (aplicada al menos 21 días antes del viaje).",
        "Certificado de Salud Europeo emitido por un veterinario oficial.",
        "Tratamiento antiparasitario (Echinococcus multilocularis) para ciertos países."
      ],
      notes: "El peso y la edad pueden influir en los requisitos de la aerolínea. Mascotas de menos de 3 meses tienen restricciones especiales."
    },
    cat: {
      title: "Guía de Viaje para Gatos a Europa",
      basePrice: "Desde $450 USD",
      requirements: [
        "Microchip ISO 11784/11785.",
        "Vacuna antirrábica vigente (aplicada al menos 21 días antes del viaje).",
        "Certificado de Salud Europeo emitido por un veterinario oficial.",
      ],
      notes: "Asegúrate de que el transportín cumpla con la normativa IATA. Consulta con la aerolínea sobre sus políticas específicas para gatos."
    }
  },
  norteamerica: {
    dog: {
      title: "Guía de Viaje para Perros a Norteamérica (EEUU/Canadá)",
      basePrice: "Desde $400 USD",
      requirements: [
        "Microchip (recomendado).",
        "Certificado de vacunación contra la rabia emitido en inglés o francés.",
        "Examen de salud por un veterinario licenciado.",
        "Para EEUU, los perros deben parecer sanos a su llegada."
      ],
      notes: "Canadá puede requerir inspección veterinaria en el puerto de entrada. Consulta las regulaciones específicas del estado o provincia de destino."
    },
    cat: {
      title: "Guía de Viaje para Gatos a Norteamérica (EEUU/Canadá)",
      basePrice: "Desde $380 USD",
      requirements: [
        "No se requiere microchip de forma obligatoria, pero es muy recomendado.",
        "Certificado de salud y vacunación antirrábica (aunque EEUU no lo exige para gatos, Canadá sí y muchas aerolíneas también).",
      ],
      notes: "Verifica siempre con la aerolínea los requisitos de embarque, especialmente sobre el transportín."
    }
  },
   asia: {
    dog: {
      title: "Guía de Viaje para Perros a Asia (General)",
      basePrice: "Desde $700 USD",
      requirements: [
        "Microchip ISO.",
        "Vacuna antirrábica y test de titulación de anticuerpos contra la rabia (muy importante para países como Japón, Singapur).",
        "Permiso de importación previo del país de destino.",
        "Certificado de Salud Internacional y múltiples tratamientos antiparasitarios."
      ],
      notes: "Asia tiene las regulaciones más estrictas y variables. Países como Japón o Singapur requieren cuarentena. La planificación debe empezar con 6-8 meses de antelación."
    },
    cat: {
      title: "Guía de Viaje para Gatos a Asia (General)",
      basePrice: "Desde $650 USD",
      requirements: [
         "Microchip ISO.",
        "Vacuna antirrábica y test de titulación de anticuerpos.",
        "Permiso de importación del país de destino.",
        "Certificado de Salud Internacional."
      ],
      notes: "Muchos países asiáticos tienen periodos de cuarentena obligatorios. Es crucial investigar los requisitos específicos del país de destino con mucha antelación."
    }
  }
};


export default function TravelGuidance() {
  const [guidance, setGuidance] = useState<typeof travelGuides.europa.dog | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);

  const form = useForm<TravelGuidanceFormValues>({
    resolver: zodResolver(travelGuidanceSchema),
    defaultValues: {
      destination: undefined,
      animalType: undefined,
      animalAge: 0,
      animalWeight: 0,
      knownHealthConditions: 'Ninguna',
    },
  });

  function onSubmit(values: TravelGuidanceFormValues) {
    setIsLoading(true);
    setGuidance(null);
    setShowContactForm(false);

    // Simulate AI processing
    setTimeout(() => {
      const guide = travelGuides[values.destination as keyof typeof travelGuides]?.[values.animalType as 'dog' | 'cat'];
      setGuidance(guide || null);
      setIsLoading(false);
       // Scroll to results
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 1000);
  }

  function handleStartProcessClick() {
    setShowContactForm(true);
     setTimeout(() => contactFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
  }
  
  const { toast } = useToast();
  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: 'Inicio de Trámites de Viaje',
      message: '',
    },
  });

  function onContactSubmit(values: ContactFormValues) {
    console.log("Contact form submitted:", values);
    toast({
      title: "Solicitud Recibida",
      description: "Un experto en viajes te contactará pronto para iniciar el proceso.",
    });
    contactForm.reset();
    setShowContactForm(false);
  }


  return (
    <section id="viajes" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Trámites de Viajes Internacionales</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Obtén una guía instantánea de los requisitos para viajar con tu mascota. Nuestra herramienta te proporcionará información detallada para tu destino.
          </p>
        </div>
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className='font-headline'>Generador de Guía de Viaje</CardTitle>
                <CardDescription>
                  Completa el formulario para generar una guía con los requisitos para tu destino.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Continente de Destino</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un continente" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="europa">Europa</SelectItem>
                              <SelectItem value="norteamerica">Norteamérica</SelectItem>
                              <SelectItem value="asia">Asia</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="animalType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Tipo de Animal</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="dog" id="dog"/>
                                </FormControl>
                                <FormLabel htmlFor="dog" className="font-normal cursor-pointer">Perro</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="cat" id="cat" />
                                </FormControl>
                                <FormLabel htmlFor="cat" className="font-normal cursor-pointer">Gato</FormLabel>
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
                        name="animalAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Edad (años)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="animalWeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Peso (kg)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="knownHealthConditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Condiciones de Salud Conocidas</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Ej: alergias, medicación crónica, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                      )}
                      Generar Guía
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3 space-y-8">
            <Card ref={resultsRef} className="min-h-full bg-background transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <Sparkles className="text-primary h-5 w-5" />
                  Guía de Viaje Personalizada
                </CardTitle>
                <CardDescription>
                  Aquí aparecerá la información generada para tu mascota.
                </CardDescription>
              </CardHeader>
              <CardContent className={cn('transition-opacity duration-500', isLoading ? 'opacity-50' : 'opacity-100')}>
                {isLoading && (
                  <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-muted-foreground">Analizando requisitos... Esto puede tardar un momento.</p>
                  </div>
                )}
                {guidance && (
                  <div className="prose prose-sm max-w-none text-foreground animate-in fade-in">
                    <h3 className='text-xl font-bold font-headline'>{guidance.title}</h3>
                    <p className='lead font-semibold text-primary'>{guidance.basePrice}</p>
                    <h4 className='font-semibold'>Requisitos Clave:</h4>
                    <ul>
                      {guidance.requirements.map(req => <li key={req}>{req}</li>)}
                    </ul>
                    <h4 className='font-semibold'>Notas Importantes:</h4>
                    <p>{guidance.notes}</p>
                     <Button onClick={handleStartProcessClick} className='mt-6'>
                        Contactar a un Experto
                    </Button>
                  </div>
                )}
                {!isLoading && !guidance && (
                  <div className="flex flex-col items-center justify-center text-center text-muted-foreground gap-4 py-8 border-2 border-dashed rounded-lg">
                     <Plane className="h-12 w-12" />
                    <p>La guía de viaje aparecerá aquí una vez generada.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                 <p className="text-xs text-muted-foreground">
                    Esta información es una guía y puede no ser completa o precisa. Consulta siempre con nuestras autoridades y la clínica para confirmar todos los requisitos.
                 </p>
              </CardFooter>
            </Card>

            {showContactForm && (
                 <div ref={contactFormRef} className='animate-in fade-in slide-in-from-top-10 duration-500'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='font-headline'>Inicia el Proceso</CardTitle>
                            <CardDescription>
                                Completa tus datos y un especialista en viajes se pondrá en contacto contigo para coordinar todo.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...contactForm}>
                                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                                <FormField
                                    control={contactForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl><Input placeholder="Tu nombre" {...field} /></FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={contactForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl><Input type="email" placeholder="tu@email.com" {...field} /></FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={contactForm.control}
                                    name="subject"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Asunto</FormLabel>
                                        <FormControl><Input {...field} disabled /></FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={contactForm.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Detalles Adicionales</FormLabel>
                                        <FormControl><Textarea placeholder="Indícanos la fecha estimada de tu viaje o cualquier otra duda..." className="min-h-[100px]" {...field} /></FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={contactForm.formState.isSubmitting}>
                                    {contactForm.formState.isSubmitting ? <Loader2 className="animate-spin" /> : 'Enviar Solicitud'}
                                </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                 </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
