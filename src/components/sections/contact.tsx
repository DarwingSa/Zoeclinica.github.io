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
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { WhatsAppIcon } from '@/components/ui/icons/whatsapp-icon';
import { CLINIC_INFO } from '@/lib/constants';

type ContactFormValues = z.infer<typeof contactFormSchema>;



const contactInfo = [
  { icon: MapPin, title: "Visítanos", text: "Calle Mirador con Av. 1, La Campiña, Distrito Capital, Venezuela", href: null },
  { icon: WhatsAppIcon, title: "WhatsApp", text: CLINIC_INFO.phoneDisplay, href: `https://wa.me/${CLINIC_INFO.whatsappNumber}`, customColor: "text-[#25D366]" },
  { icon: Mail, title: "Escríbenos", text: "contacto@centrovetzoe.com", href: "mailto:contacto@centrovetzoe.com" },
  { icon: Clock, title: "Horario", text: "Lunes a Viernes: 9am - 6pm | Sábados: 9am - 6pm", href: null },
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
      {/* ═══════════════════════════════════════════
          HERO with animated shapes
          ═══════════════════════════════════════════ */}
      <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-40 md:pb-48 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#2aaadd] to-primary bg-[length:200%_200%] animate-gradient-shift" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-[15%] w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-white/10 rounded-full blur-xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-10 left-[10%] w-28 h-28 sm:w-40 sm:h-40 md:w-64 md:h-64 bg-white/5 rounded-full blur-2xl animate-float-delayed pointer-events-none" />
        <div className="absolute top-1/2 right-[5%] w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl rotate-45 blur-lg animate-float pointer-events-none" />

        <div className="container text-center relative z-10 px-4 text-primary-foreground">
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-extrabold font-headline mb-3 sm:mb-4 md:mb-6 tracking-tight animate-fade-up">Contáctanos</h1>
          <p className="text-sm sm:text-base md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed animate-fade-up delay-100">
            Estamos aquí para escuchar a ti y a tu mascota. Ya sea para una consulta, una emergencia o simplemente para decir hola.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FLOATING CARD
          ═══════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 md:-mt-20 pb-12 sm:pb-16 md:pb-24">
        <div className="container px-4">
          <ScrollReveal direction="up" duration={800}>
            <Card className="shadow-glow-xl border-none overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-5">

                  {/* Info Column with glassmorphism */}
                  <div className="lg:col-span-2 bg-secondary/80 dark:bg-secondary/20 backdrop-blur-sm text-foreground p-5 sm:p-6 md:p-12 flex flex-col justify-between order-last lg:order-first relative overflow-hidden">
                    {/* Decorative orb */}
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="mb-6 sm:mb-8 lg:mb-0 relative z-10">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-headline mb-1.5 sm:mb-2">Información de Contacto</h3>
                      <p className="text-muted-foreground mb-5 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base">Encuentra la forma más rápida de comunicarte con nosotros.</p>

                      <ul className="space-y-5 sm:space-y-6 md:space-y-8">
                        {contactInfo.map((info, index) => (
                          <ScrollReveal key={index} direction="left" stagger={index} delay={200} as="li">
                            <div className="flex gap-3 sm:gap-4 group">
                              <div className={`bg-card dark:bg-white/5 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl shadow-sm h-fit transition-all duration-300 ${info.customColor ? 'group-hover:bg-[#25D366]/10' : 'text-primary'}`}>
                                <info.icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${info.customColor ? 'text-primary group-hover:text-[#25D366] transition-colors' : ''}`} />
                              </div>
                              <div>
                                <h4 className="font-bold text-foreground text-[11px] sm:text-xs md:text-sm uppercase tracking-wide mb-0.5 sm:mb-1">{info.title}</h4>
                                {info.href ? (
                                  <a
                                    href={info.href}
                                    target={info.icon === WhatsAppIcon ? "_blank" : "_self"}
                                    rel={info.icon === WhatsAppIcon ? "noopener noreferrer" : ""}
                                    className={`text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed transition-colors ${info.customColor ? 'hover:text-[#25D366]' : 'hover:text-primary'}`}
                                  >
                                    {info.text}
                                  </a>
                                ) : (
                                  <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">{info.text}</p>
                                )}
                              </div>
                            </div>
                          </ScrollReveal>
                        ))}
                      </ul>
                    </div>

                    {/* Map Preview */}
                    <div className="mt-5 sm:mt-6 md:mt-10 rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-primary/10 h-40 sm:h-48 lg:h-64 relative group">
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                      <iframe
                        src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Centro%20veterinario%20zoe&t=&z=17&ie=UTF8&iwloc=B&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps"
                        className="grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>

                  {/* Form Column */}
                  <div className="lg:col-span-3 bg-card p-5 sm:p-6 md:p-12 lg:p-16">
                    <ScrollReveal direction="zoom" delay={100}>
                      <div className="mb-5 sm:mb-6 md:mb-8">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-foreground mb-1.5 sm:mb-2">Envíanos un Mensaje</h3>
                        <p className="text-muted-foreground text-xs sm:text-sm md:text-base">Completa el formulario y nuestro equipo se pondrá en contacto contigo a la brevedad.</p>
                      </div>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 md:space-y-6">
                          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground font-semibold text-xs sm:text-sm md:text-base">Nombre Completo</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Tu nombre" {...field} className="bg-secondary/20 dark:bg-secondary/10 border-border/50 focus:border-primary/50 focus:bg-card transition-all duration-300 h-10 sm:h-11 md:h-12 text-sm sm:text-base rounded-lg sm:rounded-xl" />
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
                                  <FormLabel className="text-foreground font-semibold text-xs sm:text-sm md:text-base">Correo Electrónico</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="tu@email.com" {...field} className="bg-secondary/20 dark:bg-secondary/10 border-border/50 focus:border-primary/50 focus:bg-card transition-all duration-300 h-10 sm:h-11 md:h-12 text-sm sm:text-base rounded-lg sm:rounded-xl" />
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
                                <FormLabel className="text-foreground font-semibold text-xs sm:text-sm md:text-base">Asunto</FormLabel>
                                <FormControl>
                                  <Input placeholder="Motivo de tu consulta" {...field} className="bg-secondary/20 dark:bg-secondary/10 border-border/50 focus:border-primary/50 focus:bg-card transition-all duration-300 h-10 sm:h-11 md:h-12 text-sm sm:text-base rounded-lg sm:rounded-xl" />
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
                                <FormLabel className="text-foreground font-semibold text-xs sm:text-sm md:text-base">Mensaje</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Cuéntanos cómo podemos ayudarte..." className="min-h-[100px] sm:min-h-[120px] md:min-h-[150px] bg-secondary/20 dark:bg-secondary/10 border-border/50 focus:border-primary/50 focus:bg-card transition-all duration-300 resize-none p-3 md:p-4 text-sm sm:text-base rounded-lg sm:rounded-xl" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="pt-1 sm:pt-2 md:pt-4">
                            <Button type="submit" size="lg" className="w-full sm:w-auto shadow-glow-lg hover:shadow-glow-xl hover:translate-y-[-2px] transition-all duration-300 font-bold px-6 sm:px-8 h-10 sm:h-11 md:h-12 text-sm sm:text-base" disabled={form.formState.isSubmitting}>
                              Enviar Mensaje <Send className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </ScrollReveal>
                  </div>

                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
