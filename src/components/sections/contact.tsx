'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Clock, Mail, MapPin, Send } from 'lucide-react';
import { contactFormSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type ContactFormValues = z.infer<typeof contactFormSchema>;

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const contactInfo = [
  { icon: MapPin, title: "Visítanos", text: "Calle de la Veterinaria 123, 28001 Madrid, España", href: null },
  { icon: WhatsAppIcon, title: "WhatsApp", text: "+34 912 345 678", href: "https://wa.me/34912345678", customColor: "text-[#25D366]" },
  { icon: Mail, title: "Escríbenos", text: "contacto@vetpethaven.es", href: "mailto:contacto@vetpethaven.es" },
  { icon: Clock, title: "Horario", text: "Lunes a Viernes: 9am - 8pm | Sábados: 10am - 2pm", href: null },
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
    <div className="bg-background">
       {/* Hero Section */}
       <section className="relative bg-primary pt-32 pb-40 md:pt-40 md:pb-48 overflow-hidden text-primary-foreground">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          {/* Decorative Blobs */}
         <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
         
         <div className="container text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline mb-6 tracking-tight">Contáctanos</h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Estamos aquí para escuchar a ti y a tu mascota. Ya sea para una consulta, una emergencia o simplemente para decir hola.
            </p>
         </div>
       </section>

       {/* Main Content (Floating Card) */}
       <section className="relative z-20 -mt-20 pb-24">
        <div className="container px-4">
          <Card className="shadow-2xl border-none overflow-hidden rounded-3xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-5">
                
                {/* Info Column */}
                <div className="lg:col-span-2 bg-secondary text-foreground p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-headline mb-2">Información de Contacto</h3>
                    <p className="text-muted-foreground mb-8">Encuentra la forma más rápida de comunicarte con nosotros.</p>
                    
                    <ul className="space-y-8">
                      {contactInfo.map((info, index) => (
                        <li key={index} className="flex gap-4">
                          <div className={`bg-white p-3 rounded-xl shadow-sm h-fit ${info.customColor ? '' : 'text-primary'}`}>
                            <info.icon className={`h-6 w-6 ${info.customColor || ''}`} />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground text-sm uppercase tracking-wide mb-1">{info.title}</h4>
                            {info.href ? (
                                <a 
                                    href={info.href} 
                                    target={info.icon === WhatsAppIcon ? "_blank" : "_self"}
                                    rel={info.icon === WhatsAppIcon ? "noopener noreferrer" : ""}
                                    className={`text-muted-foreground text-sm md:text-base leading-relaxed hover:underline transition-colors ${info.customColor ? 'hover:text-[#25D366]' : 'hover:text-primary'}`}
                                >
                                    {info.text}
                                </a>
                            ) : (
                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{info.text}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Map Preview */}
                  <div className="mt-10 rounded-2xl overflow-hidden shadow-md border border-primary/10 h-48 lg:h-64 relative group">
                     <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none"></div>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.649615962828!2d-3.703790184605697!3d40.4167753793649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422880a8f7c9e1%3A0xfa96350e6ed3948e!2sPuerta%20del%20Sol!5e0!3m2!1sen!2ses!4v1678886400000"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps"
                      className="grayscale hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                  </div>
                </div>

                {/* Form Column */}
                <div className="lg:col-span-3 bg-white p-8 md:p-12 lg:p-16">
                  <div className="mb-8">
                     <h3 className="text-3xl font-bold font-headline text-foreground mb-2">Envíanos un Mensaje</h3>
                     <p className="text-muted-foreground">Completa el formulario y nuestro equipo se pondrá en contacto contigo a la brevedad.</p>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Nombre Completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu nombre" {...field} className="bg-secondary/20 border-secondary-foreground/10 focus:bg-white transition-colors h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Correo Electrónico</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="tu@email.com" {...field} className="bg-secondary/20 border-secondary-foreground/10 focus:bg-white transition-colors h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                       <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold">Asunto</FormLabel>
                            <FormControl>
                              <Input placeholder="Motivo de tu consulta" {...field} className="bg-secondary/20 border-secondary-foreground/10 focus:bg-white transition-colors h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                       <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold">Mensaje</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Cuéntanos cómo podemos ayudarte..." className="min-h-[150px] bg-secondary/20 border-secondary-foreground/10 focus:bg-white transition-colors resize-none p-4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button type="submit" size="lg" className="w-full md:w-auto shadow-lg hover:translate-y-[-2px] transition-all duration-300 font-bold px-8 h-12" disabled={form.formState.isSubmitting}>
                           Enviar Mensaje <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
       </section>
    </div>
  );
}
