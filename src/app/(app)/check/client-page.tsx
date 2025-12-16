
'use client';

import { useState, useRef, useEffect } from 'react';
import { InteractionForm } from "@/components/check/interaction-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateTailoredRecommendations, type GenerateTailoredRecommendationsOutput } from '@/ai/flows/generate-tailored-recommendations';
import { InteractionList } from '@/components/results/interaction-list';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'next/navigation';
import { getI18n, type Locale } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';

function LoadingSkeleton() {
    return (
        <div className="mt-8 space-y-4">
            <div className="space-y-2">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-5 w-1/2" />
            </div>
            <div className="space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    );
}

export default function CheckInteractionClientPage() {
  const [results, setResults] = useState<GenerateTailoredRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [medicationName, setMedicationName] = useState('');
  const fetchingMedicationRef = useRef<string | null>(null);
  const searchParams = useSearchParams();
  const [t, setT] = useState<(key: string) => string>(() => (key: string) => key);
  const { toast } = useToast();
  
  const locale = (searchParams.get('locale') as Locale) || 'en';
  const medicationParam = searchParams.get('medication');

  useEffect(() => {
    getI18n(locale).then(i18n => {
      setT(() => i18n.t);
    });
  }, [locale]);

  useEffect(() => {
    if (medicationParam) {
        handleCheck(medicationParam);
    }
  }, [medicationParam, locale]);

  const handleCheck = async (medName: string) => {
    const currentRequest = `${medName}-${locale}`;
    if (fetchingMedicationRef.current === currentRequest) {
      return;
    }
    
    fetchingMedicationRef.current = currentRequest;
    setIsLoading(true);
    setMedicationName(medName);
    setResults(null);
    try {
      const res = await generateTailoredRecommendations({ medicationName: medName, language: locale });
      setResults(res);
    } catch (error) {
      console.error("Failed to get interaction results:", error);
      setResults(null);
      toast({
        variant: "destructive",
        title: "Service Temporarily Unavailable",
        description: "The AI service is currently overloaded. Please try again in a moment.",
      });
    } finally {
      setIsLoading(false);
      fetchingMedicationRef.current = null;
    }
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline text-foreground">
          {t('check.title')}
        </h1>
      </div>
      <Card className="w-full max-w-lg mx-auto shadow-none border-none bg-transparent mt-4">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-headline text-foreground">{t('check.cardTitle')}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            {t('check.cardDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <InteractionForm
            onCheck={handleCheck}
            isLoading={isLoading}
            formPlaceholder={t('check.formPlaceholder')}
            formButton={t('check.formButton')}
            initialValue={medicationParam || ''}
          />
        </CardContent>
      </Card>

      <div className="mt-8">
        {isLoading && <LoadingSkeleton />}
        {!isLoading && results && (
          <InteractionList
            results={results}
            medicationName={medicationName}
          />
        )}
      </div>
    </>
  );
}
