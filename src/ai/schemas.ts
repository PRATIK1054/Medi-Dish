
import {z} from 'genkit';

export const GenerateTailoredRecommendationsInputSchema = z.object({
  medicationName: z.string().describe('The name of the medication to check.'),
  language: z.enum(['en', 'hi', 'mr', 'ta', 'te', 'kn', 'pa', 'bn', 'gu', 'ml', 'or', 'as']).describe('The target language for the output. en: English, hi: Hindi, mr: Marathi, ta: Tamil, te: Telugu, kn: Kannada, pa: Punjabi, bn: Bengali, gu: Gujarati, ml: Malayalam, or: Odia, as: Assamese.'),
});

const RecommendationSchema = z.object({
  foodName: z.string().describe('The name of the food this recommendation is for.'),
  description: z.string().describe('A one-sentence overview of the interaction and its primary risk.'),
  mechanismOfAction: z.array(z.string()).describe('A brief, step-by-step explanation of how the interaction occurs (max 3 steps).'),
});

export const GenerateTailoredRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema),
});


export const TranslateRecommendationsInputSchema = z.object({
  recommendations: GenerateTailoredRecommendationsOutputSchema.describe('The recommendation object containing the text to be translated.'),
  language: z.enum(['en', 'hi', 'mr', 'ta', 'te', 'kn', 'pa', 'bn', 'gu', 'ml', 'or', 'as']).describe('The target language for the output. en: English, hi: Hindi, mr: Marathi, ta: Tamil, te: Telugu, kn: Kannada, pa: Punjabi, bn: Bengali, gu: Gujarati, ml: Malayalam, or: Odia, as: Assamese.'),
});

export const ExtractMedicationsFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a medical prescription, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export const ExtractMedicationsFromImageOutputSchema = z.object({
    medications: z.array(z.string()).describe('A list of medication names extracted from the prescription image.'),
});
