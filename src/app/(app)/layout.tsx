
'use client';

import Link from 'next/link';
import {
  CircleUser,
  PanelLeft,
} from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { type I18n, getI18n, type Locale } from '@/lib/i18n';
import NavItems from '@/components/layout/nav-items';
import UserProfileLink from '@/components/layout/user-profile-link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '@/components/layout/language-switcher';


function Header({ t }: { t: I18n['t'] }) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-card p-0">
          <SheetHeader className='sr-only'>
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>
              Main navigation links for the application.
            </SheetDescription>
          </SheetHeader>
          <Sidebar t={t} />
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        {/* Can be used for search bar in header */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link href="/profile">{t('profile')}</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link href="/">{t('logout')}</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

function Sidebar({ t }: { t: I18n['t'] }) {
    const navTranslations = {
        dashboard: t('nav.dashboard'),
        interactionCheck: t('nav.interactionCheck'),
        myMedications: t('nav.myMedications'),
        reminders: t('nav.reminders'),
        scanPrescription: t('nav.scanPrescription'),
        learn: t('nav.learn'),
    };
    
  return (
    <>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl text-foreground">Dish &amp; Dose</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <NavItems navTranslations={navTranslations} />
        </nav>
      </div>
      <div className="mt-auto p-4 space-y-4 border-t">
        <UserProfileLink t={t} />
        <LanguageSwitcher label={t('language')} />
      </div>
    </>
  );
};


function AppLayoutContent({ children }: { children: React.ReactNode }) {
    const [t, setT] = useState<I18n['t']>(() => (key: string) => key);
    const searchParams = useSearchParams();
    const locale = (searchParams.get('locale') as Locale) || 'en';

    useEffect(() => {
        getI18n(locale).then(({ t }) => {
          setT(() => t);
        });
    }, [locale]);

    return (
        <div className="flex flex-col bg-secondary">
          <Header t={t} />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
    );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [t, setT] = useState<I18n['t']>(() => (key: string) => key);
    const searchParams = useSearchParams();
    const locale = (searchParams.get('locale') as Locale) || 'en';
    
    useEffect(() => {
        getI18n(locale).then(({ t }) => {
          setT(() => t);
        });
    }, [locale]);


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <Sidebar t={t} />
        </div>
      </div>
      <AppLayoutContent>
        {children}
      </AppLayoutContent>
    </div>
  );
}
