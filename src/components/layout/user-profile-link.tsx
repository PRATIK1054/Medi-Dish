
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { I18n } from '@/lib/i18n';

export default function UserProfileLink({ t }: { t: I18n['t'] }) {
    const pathname = usePathname();
    const isActive = pathname === '/profile';

    return (
        <Link
            href="/profile"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground'
                }`}
        >
            <Image src="https://picsum.photos/seed/1/32/32" alt="User" width={24} height={24} className="rounded-full" />
            {t('userProfile')}
        </Link>
    );
}
