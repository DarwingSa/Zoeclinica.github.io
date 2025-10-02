import { z } from 'zod';

export const travelGuidanceSchema = z.object({
  destination: z.enum(['europa', 'norteamerica', 'asia'], { required_error: 'Debes seleccionar un destino.' }),
  animalType: z.enum(['dog', 'cat'], { required_error: 'Debes seleccionar un tipo de animal.' }),
  animalAge: z.coerce.number().min(0, { message: 'La edad no puede ser negativa.' }).max(30, { message: 'La edad parece demasiado alta.' }),
  animalWeight: z.coerce.number().min(0, { message: 'El peso no puede ser negativo.' }).max(100, { message: 'El peso parece demasiado alto.' }),
  knownHealthConditions: z.string().min(2, { message: 'Por favor, ingrese "ninguna" si no hay condiciones.' }),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, ingrese un email válido.' }),
  subject: z.string().min(2, { message: 'El asunto debe tener al menos 2 caracteres.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
});
