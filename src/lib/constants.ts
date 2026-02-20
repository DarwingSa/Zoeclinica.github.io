/**
 * Shared navigation links used by Header and Footer.
 * Single source of truth for site navigation structure.
 */
export const NAV_LINKS = [
    { href: '/', label: 'Inicio' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/viajes', label: 'Viajes' },
    { href: '/contacto', label: 'Contacto' },
] as const;

/**
 * Clinic contact information — single source of truth.
 * Update these values with real data before deploying.
 */
export const CLINIC_INFO = {
    name: 'Centro Veterinario Zoé',
    phone: '+58 412 5957240',
    phoneDisplay: '+58 412 5957240',
    email: 'contacto@centrovetzoe.com',
    address: 'Calle Mirador con Av. 1, La Campiña, Distrito Capital, Venezuela',
    whatsappNumber: '584125957240',
    googleMapsEmbedUrl:
        'https://maps.google.com/maps?width=600&height=400&hl=es&q=Centro%20veterinario%20zoe%20La%20Campi%C3%B1a%20Caracas&t=&z=17&ie=UTF8&iwloc=B&output=embed',
    schedule: {
        weekdays: 'Lun - Vie: 9:00 AM - 6:00 PM',
        saturday: 'Sáb: 9:00 AM - 6:00 PM',
        sunday: 'Dom: Cerrado',
    },
    /** Country used in AI travel guidance prompts */
    country: 'Venezuela',
} as const;
