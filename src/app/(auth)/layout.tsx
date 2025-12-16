import Link from 'next/link';
import { Logo } from '@/components/icons/logo';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}
