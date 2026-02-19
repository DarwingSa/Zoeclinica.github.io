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
    phone: '+58 412 595 7240',
    phoneDisplay: '+58 412 595 7240',
    email: 'contacto@vetpethaven.es',
    address: 'Calle de la Veterinaria 123, Madrid, España',
    whatsappNumber: '584125957240',
    googleMapsEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.668!2d-3.7037902!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMadrid!5e0!3m2!1ses!2ses!4v1600000000000!5m2!1ses!2ses',
    schedule: {
        weekdays: 'Lun - Vie: 9:00 AM - 8:00 PM',
        saturday: 'Sáb: 9:00 AM - 2:00 PM',
        sunday: 'Dom: Cerrado',
    },
    /** Country used in AI travel guidance prompts */
    country: 'España',
} as const;
