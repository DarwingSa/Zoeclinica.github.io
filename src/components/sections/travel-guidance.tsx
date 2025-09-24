'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Loader2, Sparkles, Wand2, Plane } from 'lucide-react';

import { getTravelGuidance } from '@/lib/actions';
import { travelGuidanceSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type TravelGuidanceFormValues = z.infer<typeof travelGuidanceSchema>;

export default function TravelGuidance() {
  const [guidance, setGuidance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<TravelGuidanceFormValues>({
    resolver: zodResolver(travelGuidanceSchema),
    defaultValues: {
      destination: '',
      animalType: undefined,
      animalAge: 0,
      knownHealthConditions: 'Ninguna',
    },
  });

  async function onSubmit(values: TravelGuidanceFormValues) {
    setIsLoading(true);
    setGuidance(null);

    const result = await getTravelGuidance(values);

    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    } else if (result.data) {
      setGuidance(result.data.guidance);
    }
  }

  return (
    <section id="viajes" className="bg-muted section-padding scroll-mt-header">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Trámites de Viajes Internacionales</h2>
          <p className="text-lg text-muted-foreground mt-2">
            Obtén una guía personalizada de los requisitos para viajar con tu mascota.
          </p>
        </div>
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Generador de Guía de Viaje</CardTitle>
                <CardDescription>
                  Completa el formulario para que nuestra IA genere una guía con los requisitos para tu destino.
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
                          <FormLabel>País de Destino</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej: Francia" {...field} />
                          </FormControl>
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
                                  <RadioGroupItem value="dog" />
                                </FormControl>
                                <FormLabel className="font-normal">Perro</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="cat" />
                                </FormControl>
                                <FormLabel className="font-normal">Gato</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="animalAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Edad (años)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="knownHealthConditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Condiciones de Salud Conocidas</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe cualquier condición..." {...field} />
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
          <div className="lg:col-span-3">
            <Card className="min-h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="text-primary h-5 w-5" />
                  Guía de Viaje Personalizada
                </CardTitle>
                <CardDescription>
                  Aquí aparecerá la información generada por la IA.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading && (
                  <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-muted-foreground">Analizando requisitos... Esto puede tardar un momento.</p>
                  </div>
                )}
                {guidance && (
                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                    {guidance}
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
                    Esta información es una guía generada por IA y puede no ser completa o precisa. Consulta siempre con nuestras autoridades y la clínica para confirmar todos los requisitos.
                 </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
