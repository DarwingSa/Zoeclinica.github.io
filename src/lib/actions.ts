'use server';

import { internationalTravelGuidance, type InternationalTravelGuidanceInput } from '@/ai/flows/international-travel-guidance';
import { travelGuidanceSchema } from '@/lib/schema';

export async function getTravelGuidance(input: InternationalTravelGuidanceInput) {
  const validatedInput = travelGuidanceSchema.safeParse(input);

  if (!validatedInput.success) {
    const errorMessage = validatedInput.error.errors.map(e => e.message).join(', ');
    return { error: `Entrada inválida: ${errorMessage}`, data: null };
  }
  
  try {
    const result = await internationalTravelGuidance(validatedInput.data);
    return { error: null, data: result };
  } catch (e) {
    console.error(e);
    return { error: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.', data: null };
  }
}
