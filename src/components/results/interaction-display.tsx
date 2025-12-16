
'use client';

import { useState, useEffect } from 'react';
import { type GenerateTailoredRecommendationsOutput } from '@/ai/flows/generate-tailored-recommendations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Volume2, Loader, Pause, Workflow, CheckCircle } from "lucide-react";
import { generateAudio } from '@/ai/flows/generate-audio';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Separator } from '../ui/separator';

type Recommendation = GenerateTailoredRecommendationsOutput['recommendations'][0];
type AudioState = 'idle' | 'loading' | 'playing' | 'paused';


export function InteractionDisplay({ recommendation }: { recommendation: Recommendation }) {
    const [audioState, setAudioState] = useState<AudioState>('idle');
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        // Cleanup audio element on component unmount
        return () => {
            if (audio) {
                audio.pause();
                setAudio(null);
            }
        };
    }, [audio]);

    const handlePlayPause = async () => {
        if (audioState === 'loading') return;

        if (audioState === 'playing' && audio) {
            audio.pause();
            return;
        }

        if (audioState === 'paused' && audio) {
            audio.play();
            return;
        }

        if (audioState === 'idle') {
            setAudioState('loading');
            try {
                const textToSpeak = `Interaction with ${recommendation.foodName}. ${recommendation.description}.`;
                const audioDataUri = await generateAudio(textToSpeak);
                const newAudio = new Audio(audioDataUri);
                
                newAudio.onplay = () => setAudioState('playing');
                newAudio.onpause = () => setAudioState('paused');
                newAudio.onended = () => setAudioState('idle');

                setAudio(newAudio);
                newAudio.play();
            } catch (error) {
                console.error("Failed to generate or play audio:", error);
                toast({
                  variant: "destructive",
                  title: "Audio Generation Failed",
                  description: "The audio service is temporarily unavailable. Please try again in a moment.",
                });
                setAudioState('idle');
            }
        }
    };

    const renderAudioIcon = () => {
        switch (audioState) {
            case 'loading':
                return <Loader className="h-5 w-5 animate-spin" />;
            case 'playing':
                return <Pause className="h-5 w-5" />;
            case 'paused':
            case 'idle':
            default:
                return <Volume2 className="h-5 w-5" />;
        }
    }

    return (
        <Card className={`shadow-md bg-background border-l-4 border-primary`}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <CardTitle className="flex items-center gap-2 font-headline text-xl text-foreground">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {recommendation.foodName}
                </CardTitle>
              </div>
              <Button variant="ghost" size="icon" onClick={handlePlayPause} disabled={audioState === 'loading'}>
                {renderAudioIcon()}
                <span className="sr-only">Listen to interaction</span>
              </Button>
            </div>
            <CardDescription className="pt-2 text-base">
              {recommendation.description}
            </CardDescription>
          </CardHeader>
          {recommendation.mechanismOfAction && recommendation.mechanismOfAction.length > 0 && (
            <>
              <Separator className="mx-6 w-auto" />
              <CardContent>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="link" className="p-0 h-auto text-muted-foreground">
                        <Workflow className="mr-2 h-4 w-4" />
                        Show Mechanism of Action
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-3">
                    {recommendation.mechanismOfAction.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <p className="text-sm text-foreground">{step}</p>
                        </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </>
          )}
        </Card>
      );
}
