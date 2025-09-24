'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { contactFormSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


type ContactFormValues = z.infer<typeof contactFormSchema>;

const contactInfo = [
  { icon: MapPin, text: "Calle de la Veterinaria 123, 28001 Madrid, España" },
  { icon: Phone, text: "+34 912 345 678" },
  { icon: Mail, text: "contacto@vetpethaven.es" },
  { icon: Clock, text: "Lunes a Viernes: 9am - 8pm | Sábados: 10am - 2pm" },
];

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.log(values);
    toast({
      title: "Mensaje Enviado",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    });
    form.reset();
  }
  
  return (
    <section id="contacto" className="bg-background section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Contacto</h1>
          <p className="text-lg text-muted-foreground mt-2">Estamos aquí para ayudarte. ¡Ponte en contacto con nosotros!</p>
        </div>
        <Card className="shadow-lg">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Información de Contacto</h3>
                  <ul className="space-y-4 text-foreground">
                    {contactInfo.map((info, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <info.icon className="h-6 w-6 text-primary mt-1 shrink-0" />
                        <span>{info.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                 <div className="mt-8 rounded-lg overflow-hidden aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.649615962828!2d-3.703790184605697!3d40.4167753793649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422880a8f7c9e1%3A0xfa96350e6ed3948e!2sPuerta%20del%20Sol!5e0!3m2!1sen!2ses!4v1678886400000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                  ></iframe>
                </div>
              </div>
              <div className="p-8 md:p-10 bg-muted/50">
                <h3 className="text-2xl font-semibold mb-6">Envíanos un Mensaje</h3>
                 <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
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
                      control={form.control}
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
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asunto</FormLabel>
                          <FormControl><Input placeholder="Asunto de tu mensaje" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje</FormLabel>
                          <FormControl><Textarea placeholder="Escribe tu consulta aquí..." className="min-h-[120px]" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>Enviar Mensaje</Button>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
