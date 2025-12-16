import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Pill, ShieldCheck } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/icons/logo';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-section');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline font-bold text-foreground">Dish & Dose</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-foreground">
                Your guide to safe eating with medication.
              </h1>
              <p className="text-lg text-muted-foreground">
                Dish & Dose helps you understand potential interactions between
                your prescribed medications and the foods you consume, ensuring
                your path to wellness is safe and informed.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                    <Link href="/signup">Get Started Today</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  fill
                  className="object-cover"
                />
              )}
               <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-card py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                Smart, Simple, and Safe
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover how Dish & Dose empowers you to take control of your health with powerful, easy-to-use features.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow bg-background">
                <CardHeader>
                  <div className="mx-auto bg-accent rounded-full h-16 w-16 flex items-center justify-center">
                    <Pill className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-headline pt-4 text-foreground">Interaction Checker</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Instantly check for potential food-drug interactions to avoid adverse effects.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow bg-background">
                <CardHeader>
                  <div className="mx-auto bg-accent rounded-full h-16 w-16 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-headline pt-4 text-foreground">AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get smart, AI-powered suggestions for safer dietary alternatives.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow bg-background">
                <CardHeader>
                  <div className="mx-auto bg-accent rounded-full h-16 w-16 flex items-center justify-center">
                    <ShieldCheck className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-headline pt-4 text-foreground">Personalized Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Manage your medications, view your history, and set reminders all in one place.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Dish & Dose. All rights reserved.</p>
      </footer>
    </div>
  );
}
