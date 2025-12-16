import { config } from 'dotenv';
config();

import '@/ai/schemas.ts';
import '@/ai/flows/generate-audio';
import '@/ai/flows/extract-medications-from-image';
