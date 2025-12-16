
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BellRing,
  BookOpen,
  FlaskConical,
  LayoutDashboard,
  Pill,
  ScanLine,
} from 'lucide-react';

type NavTranslations = {
    dashboard: string;
    interactionCheck: string;
    myMedications: string;
    reminders: string;
    scanPrescription: string;
    learn: string;
};

type NavItem = {
    href: string;
    icon: React.ElementType;
    label: keyof NavTranslations;
};

const navItemsList: NavItem[] = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'dashboard' },
    { href: '/check', icon: FlaskConical, label: 'interactionCheck' },
    { href: '/medications', icon: Pill, label: 'myMedications' },
    { href: '/reminders', icon: BellRing, label: 'reminders' },
    { href: '/scan', icon: ScanLine, label: 'scanPrescription' },
    { href: '/learn', icon: BookOpen, label: 'learn' },
];

export default function NavItems({ navTranslations }: { navTranslations: NavTranslations }) {
    const pathname = usePathname();

    return (
        <>
            {navItemsList.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground'
                            }`}
                    >
                        <item.icon className="h-4 w-4" />
                        {navTranslations[item.label]}
                    </Link>
                );
            })}
        </>
    );
}
