'use server';

/**
 * @fileOverview An AI agent that provides international travel guidance for pets.
 *
 * - internationalTravelGuidance - A function that provides international travel guidance for pets.
 * - InternationalTravelGuidanceInput - The input type for the internationalTravelGuidance function.
 * - InternationalTravelGuidanceOutput - The return type for the internationalTravelGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InternationalTravelGuidanceInputSchema = z.object({
  destination: z.string().describe('The destination country.'),
  animalType: z.enum(['dog', 'cat']).describe('The type of animal.'),
  animalAge: z.number().describe('The age of the animal in years.'),
  knownHealthConditions: z.string().describe('Any known health conditions of the animal.'),
});
export type InternationalTravelGuidanceInput = z.infer<typeof InternationalTravelGuidanceInputSchema>;

const InternationalTravelGuidanceOutputSchema = z.object({
  guidance: z.string().describe('The required health certificates, microchipping, and advisories for traveling internationally with the pet.'),
});
export type InternationalTravelGuidanceOutput = z.infer<typeof InternationalTravelGuidanceOutputSchema>;

export async function internationalTravelGuidance(
  input: InternationalTravelGuidanceInput
): Promise<InternationalTravelGuidanceOutput> {
  return internationalTravelGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'internationalTravelGuidancePrompt',
  input: {schema: InternationalTravelGuidanceInputSchema},
  output: {schema: InternationalTravelGuidanceOutputSchema},
  prompt: `You are an expert veterinarian specializing in international pet travel requirements from [COUNTRY WHERE CLINIC IS BASED].

  Based on the destination, animal type, animal age, and known health conditions, provide the required health certificates, microchipping, and advisories for traveling internationally with the pet.

  Destination: {{{destination}}}
  Animal Type: {{{animalType}}}
  Animal Age: {{{animalAge}}}
  Known Health Conditions: {{{knownHealthConditions}}}

  Only respond for travel from [COUNTRY WHERE CLINIC IS BASED]. Do not respond if destination is [COUNTRY WHERE CLINIC IS BASED].
  If there is no travel guidance information for the specified destination, respond saying, "Sorry, we don't have information available for travel to that destination at this time."
  `,
});

const internationalTravelGuidanceFlow = ai.defineFlow(
  {
    name: 'internationalTravelGuidanceFlow',
    inputSchema: InternationalTravelGuidanceInputSchema,
    outputSchema: InternationalTravelGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
