
import { Pill, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userProfile, medications } from "@/lib/data";
import { getI18n } from "@/lib/i18n";
import { headers } from "next/headers";

export default async function Dashboard() {
  const headersList = headers();
  const locale = headersList.get('x-locale') as 'en' | 'hi' | 'mr' || 'en';
  const { t } = await getI18n(locale);
  const userMedications = medications.filter(m => userProfile.medications.includes(m.id));
  const today = new Date().toLocaleDateString();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold font-headline text-foreground">
          {t('dashboard.welcome')}
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card className="sm:col-span-2 lg:col-span-2 bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium font-headline text-foreground">{t('dashboard.currentMedications')}</CardTitle>
            <Pill className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {userMedications.map(med => (
                <div key={med.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary">
                  <span className="font-medium text-foreground">{med.genericName}</span>
                  <span className="text-sm text-muted-foreground">{med.brandNames[0]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium font-headline text-foreground">{t('dashboard.recentChecks')}</CardTitle>
            <History className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
               <div className="text-sm">
                  <p className="font-semibold text-foreground">Warfarin {t('dashboard.interaction')}</p>
                  <p className="text-muted-foreground">{t('dashboard.checkedOn', { date: today })}</p>
                </div>
                 <div className="text-sm">
                  <p className="font-semibold text-foreground">Lisinopril {t('dashboard.interaction')}</p>
                  <p className="text-muted-foreground">{t('dashboard.checkedOn', { date: today })}</p>
                </div>
            </div>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2 lg:col-span-3 bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium font-headline text-foreground">{t('dashboard.reminders')}</CardTitle>
            <CardDescription>
              {t('dashboard.remindersDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <div className="flex justify-between items-center p-3 rounded-lg bg-secondary">
                <span className="font-medium text-foreground">Warfarin</span>
                <span className="font-bold text-foreground">8:00 AM</span>
             </div>
             <div className="flex justify-between items-center p-3 rounded-lg bg-secondary">
                <span className="font-medium text-foreground">Lisinopril</span>
                <span className="font-bold text-foreground">8:00 PM</span>
             </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
