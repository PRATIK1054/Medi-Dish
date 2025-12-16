
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '../ui/label';

const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिन्दी' },
    { value: 'mr', label: 'मराठी' },
    { value: 'ta', label: 'தமிழ்' },
    { value: 'te', label: 'తెలుగు' },
    { value: 'kn', label: 'ಕನ್ನಡ' },
    { value: 'pa', label: 'ਪੰਜਾਬੀ' },
    { value: 'bn', label: 'বাংলা' },
    { value: 'gu', label: 'ગુજરાતી' },
    { value: 'ml', label: 'മലയാളം' },
    { value: 'or', label: 'ଓଡିଆ' },
    { value: 'as', label: 'অসমীয়া' },
];

export default function LanguageSwitcher({ label }: { label: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentLocale = searchParams.get('locale') || 'en';

    const handleValueChange = (newLocale: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set('locale', newLocale);
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.push(`${pathname}${query}`);
    };

    return (
        <div className="space-y-2">
            <Label className="text-muted-foreground px-3">{label}</Label>
            <Select onValueChange={handleValueChange} defaultValue={currentLocale}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                    {languages.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
