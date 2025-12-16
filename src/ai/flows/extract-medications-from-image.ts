
'use server';
/**
 * @fileOverview A flow for extracting medication names from a prescription image.
 *
 * - extractMedicationsFromImage - A function that handles the extraction process.
 * - ExtractMedicationsFromImageInput - The input type for the function.
 * - ExtractMedicationsFromImageOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import {
  ExtractMedicationsFromImageInputSchema,
  ExtractMedicationsFromImageOutputSchema,
} from '@/ai/schemas';
import { z } from 'genkit';


export type ExtractMedicationsFromImageInput = z.infer<typeof ExtractMedicationsFromImageInputSchema>;
export type ExtractMedicationsFromImageOutput = z.infer<typeof ExtractMedicationsFromImageOutputSchema>;


const prompt = ai.definePrompt({
  name: 'extractMedicationsFromImagePrompt',
  input: { schema: ExtractMedicationsFromImageInputSchema },
  output: { schema: ExtractMedicationsFromImageOutputSchema },
  prompt: `
    You are an expert optical character recognition (OCR) system specializing in parsing medical prescriptions.
    Your task is to analyze the provided image of a prescription and extract only the names of the prescribed medications.

    - Identify all medications listed on the prescription.
    - Return a clean list of medication names.
    - Do not include dosages, frequencies, or any other information.
    - If no medications can be clearly identified, return an empty list.

    Prescription Image: {{media url=photoDataUri}}
  `,
});

const extractMedicationsFromImageFlow = ai.defineFlow(
  {
    name: 'extractMedicationsFromImageFlow',
    inputSchema: ExtractMedicationsFromImageInputSchema,
    outputSchema: ExtractMedicationsFromImageOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output || { medications: [] };
  }
);

export async function extractMedicationsFromImage(input: ExtractMedicationsFromImageInput): Promise<ExtractMedicationsFromImageOutput> {
  return extractMedicationsFromImageFlow(input);
}
