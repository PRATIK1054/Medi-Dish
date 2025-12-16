import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { Logo } from "@/components/icons/logo";

export default function LoginPage() {
  return (
    <>
      <Card className="shadow-lg bg-card">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center border-2 border-primary/20">
            <Logo className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl text-foreground pt-2">Dish And Dose</CardTitle>
          <CardDescription>Your guide to safe eating with medication.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
}
