import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, ingrese un email válido.' }),
  subject: z.string().min(2, { message: 'El asunto debe tener al menos 2 caracteres.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
});
