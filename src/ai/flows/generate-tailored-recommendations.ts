
'use server';
/**
 * @fileOverview A flow for generating tailored food-drug interaction recommendations.
 *
 * - generateTailoredRecommendations - A function that generates recommendations.
 * - GenerateTailoredRecommendationsInput - The input type for the function.
 * - GenerateTailoredRecommendationsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateTailoredRecommendationsOutputSchema,
  GenerateTailoredRecommendationsInputSchema,
} from '@/ai/schemas';
import { z } from 'genkit';


export type GenerateTailoredRecommendationsInput = z.infer<typeof GenerateTailoredRecommendationsInputSchema>;
export type GenerateTailoredRecommendationsOutput = z.infer<typeof GenerateTailoredRecommendationsOutputSchema>;

const languageMap = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  pa: 'Punjabi',
  bn: 'Bengali',
  gu: 'Gujarati',
  ml: 'Malayalam',
  or: 'Odia',
  as: 'Assamese',
};

const prompt = ai.definePrompt({
  name: 'generateTailoredRecommendationsPrompt',
  input: { schema: GenerateTailoredRecommendationsInputSchema.extend({ languageName: z.string() }) },
  output: { schema: GenerateTailoredRecommendationsOutputSchema },
  prompt: `
    You are an expert clinical pharmacist. Your primary function is to provide a concise summary of the most significant food-drug interactions.

    The user is taking the medication: '{{medicationName}}'.

    You MUST provide a response that summarizes the most important and common food-drug interactions for this medication. For each interaction, you must provide the following information:

    1.  **foodName**: The name of the specific food, food group, or nutrient that interacts with the drug.
    2.  **description**: A one-sentence overview of the interaction and its primary risk.
    3.  **mechanismOfAction**: A brief, simplified step-by-step explanation of how the interaction occurs. This should be a maximum of 3 short steps.

    Your goal is to be concise and provide only the most critical information.

    IMPORTANT: ALL output text MUST be in the following language: {{languageName}}.
  `,
});

// Simple in-memory cache
const flowCache = new Map<string, GenerateTailoredRecommendationsOutput>();

const generateTailoredRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateTailoredRecommendationsFlow',
    inputSchema: GenerateTailoredRecommendationsInputSchema,
    outputSchema: GenerateTailoredRecommendationsOutputSchema,
  },
  async input => {
    const cacheKey = `${input.medicationName}-${input.language}`;
    if (flowCache.has(cacheKey)) {
      const cachedResult = flowCache.get(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }
    }

    const languageName = languageMap[input.language];
    const { output } = await prompt({ ...input, languageName });

    if (!output) {
      const emptyResult = { recommendations: [] };
      flowCache.set(cacheKey, emptyResult);
      return emptyResult;
    }
    
    flowCache.set(cacheKey, output);
    // Set a timeout to clear the cache entry after 5 minutes to allow for re-fetching fresh data
    setTimeout(() => {
        flowCache.delete(cacheKey);
    }, 5 * 60 * 1000);

    return output;
  }
);

export async function generateTailoredRecommendations(input: GenerateTailoredRecommendationsInput): Promise<GenerateTailoredRecommendationsOutput> {
  return generateTailoredRecommendationsFlow(input);
}
