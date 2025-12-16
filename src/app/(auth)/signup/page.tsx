import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupForm } from "@/components/auth/signup-form";
import Link from "next/link";
import { Logo } from "@/components/icons/logo";

export default function SignupPage() {
  return (
    <>
      <Card className="shadow-lg bg-card">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center border-2 border-primary/20">
            <Logo className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl text-foreground pt-2">Create an Account</CardTitle>
          <CardDescription>Start your journey to safer eating today.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
       <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
    </>
  );
}
