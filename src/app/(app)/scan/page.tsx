'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Camera, ScanLine, Upload, X, Pill, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import { extractMedicationsFromImage, type ExtractMedicationsFromImageOutput } from '@/ai/flows/extract-medications-from-image';
import Link from 'next/link';

type ScanState = 'idle' | 'scanning' | 'captured' | 'loading' | 'results';

export default function ScanPage() {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [extractedMeds, setExtractedMeds] = useState<ExtractMedicationsFromImageOutput | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const getCameraPermission = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
            variant: 'destructive',
            title: 'Camera Not Supported',
            description: 'Your browser does not support camera access.',
        });
        setHasCameraPermission(false);
        return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setHasCameraPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setScanState('scanning');
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings.',
      });
      setScanState('idle');
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        setScanState('captured');
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setCapturedImage(dataUrl);
        setScanState('captured');
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!capturedImage) return;
    setScanState('loading');
    try {
      const result = await extractMedicationsFromImage({ photoDataUri: capturedImage });
      setExtractedMeds(result);
      setScanState('results');
    } catch (error) {
      console.error('Failed to extract medications:', error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not extract medication information from the image. Please try again with a clearer picture.",
      });
      setScanState('captured');
    }
  };

  const reset = () => {
    setCapturedImage(null);
    setExtractedMeds(null);
    setHasCameraPermission(null);
    setScanState('idle');
    if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
    }
  };

  const renderContent = () => {
    switch (scanState) {
      case 'idle':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <ScanLine className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight font-headline text-foreground">
              Scan Your Prescription
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Use your device's camera to scan a prescription, or upload an image to identify medications and check for interactions.
            </p>
            <div className="flex gap-4 pt-4">
              <Button onClick={getCameraPermission} size="lg">
                <Camera className="mr-2 h-5 w-5" />
                Start Camera
              </Button>
              <Button variant="outline" size="lg" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-5 w-5" />
                Upload Image
              </Button>
              <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*"
              />
            </div>
            {hasCameraPermission === false && (
                <Alert variant="destructive" className="mt-4 text-left">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        To scan a prescription, please allow camera access in your browser settings.
                    </AlertDescription>
                </Alert>
            )}
          </div>
        );
      case 'scanning':
        return (
          <div className="w-full flex flex-col items-center gap-4">
            <video ref={videoRef} className="w-full max-w-md aspect-video rounded-md bg-black" autoPlay muted playsInline />
            <Button onClick={handleCapture} size="lg" className="w-full max-w-md">Capture Prescription</Button>
            <Button variant="ghost" onClick={reset}>Cancel</Button>
          </div>
        );
      case 'captured':
        return (
          <div className="w-full flex flex-col items-center gap-4">
            <img src={capturedImage!} alt="Captured prescription" className="w-full max-w-md rounded-md" />
            <Button onClick={processImage} size="lg" className="w-full max-w-md">
                <Sparkles className="mr-2 h-5 w-5" />
                Analyze Prescription
            </Button>
            <Button variant="ghost" onClick={reset}>Start Over</Button>
          </div>
        );
      case 'loading':
        return (
            <div className="flex flex-col items-center gap-4 text-center">
                <h3 className="text-2xl font-bold tracking-tight font-headline text-foreground">Analyzing...</h3>
                <p className="text-sm text-muted-foreground">Extracting medication information from your image.</p>
                <div className="w-full max-w-md space-y-4 pt-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        );
      case 'results':
        return (
          <div className="w-full max-w-md flex flex-col items-center gap-6">
            <Card className="w-full bg-secondary">
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Extracted Medications</CardTitle>
                    <CardDescription>We found the following medications in your prescription.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {extractedMeds?.medications && extractedMeds.medications.length > 0 ? (
                        extractedMeds.medications.map((med, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background shadow-sm">
                                <span className="font-semibold text-foreground flex items-center gap-2">
                                    <Pill className="h-5 w-5 text-primary" />
                                    {med}
                                </span>
                                <Button asChild variant="link" size="sm">
                                    <Link href={`/check?medication=${encodeURIComponent(med)}`}>
                                        Check Interaction
                                    </Link>
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-center py-4">No medications were identified. Please try with a clearer image.</p>
                    )}
                </CardContent>
            </Card>
            <Button variant="outline" onClick={reset}>
                <X className="mr-2 h-4 w-4" />
                Scan Another Prescription
            </Button>
          </div>
        );
    }
  };


  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline text-foreground">
          Scan Prescription
        </h1>
      </div>
      <Card className="mt-4 w-full">
        <CardContent className="flex flex-1 items-center justify-center rounded-lg py-12 md:py-16">
          {renderContent()}
        </CardContent>
      </Card>
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
