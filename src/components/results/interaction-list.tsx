'use client';

import { type GenerateTailoredRecommendationsOutput } from '@/ai/flows/generate-tailored-recommendations';
import { Card, CardContent } from '@/components/ui/card';
import { InteractionDisplay } from './interaction-display';
import { AlertTriangle } from 'lucide-react';

export function InteractionList({
  results,
  medicationName
}: {
  results: GenerateTailoredRecommendationsOutput | null;
  medicationName: string;
}) {

  if (!results) {
     return (
      <Card className="mt-4">
        <CardContent className="flex flex-col items-center justify-center text-center py-16 px-4">
          <AlertTriangle className="w-16 h-16 text-amber-500" />
          <h2 className="text-2xl font-bold font-headline text-foreground mt-4">No Results</h2>
          <p className="mt-2 text-muted-foreground max-w-md">
            No interaction results were found. This could be because the AI service is unavailable or no significant interactions exist.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
      <div className="mt-4 space-y-6">
        <div>
          <h2 className="text-3xl font-bold font-headline text-foreground capitalize">
            {medicationName}
          </h2>
          <p className="text-lg text-muted-foreground">
            Displaying potential food interactions for {medicationName}.
          </p>
        </div>

        {results.recommendations.length > 0 ? (
          results.recommendations.map((rec, index) => (
            <InteractionDisplay key={index} recommendation={rec} />
          ))
        ) : (
          <Card>
            <CardContent>
              <p className="py-6">No significant food-drug interactions were found for {medicationName}.</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
}
