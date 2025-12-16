
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellRing, Pill, PlusCircle } from "lucide-react";
import { userProfile, medications } from "@/lib/data";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type Reminder = {
    medicationId: string;
    time: string;
};

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(userProfile.reminders);
  const userMedications = medications.filter(m => userProfile.medications.includes(m.id));
  const { toast } = useToast();

  const handleTimeChange = (medicationId: string, time: string) => {
    const existingReminder = reminders.find(r => r.medicationId === medicationId);
    if (existingReminder) {
        setReminders(reminders.map(r => r.medicationId === medicationId ? { ...r, time } : r));
    }
  };

  const handleSetReminder = (medicationId: string) => {
    const newTime = '09:00'; // Default time
    if (!reminders.some(r => r.medicationId === medicationId)) {
        setReminders([...reminders, { medicationId, time: newTime }]);
        toast({
            title: "Reminder Added",
            description: `A reminder has been set for 9:00 AM. You can adjust the time now.`,
        });
    }
  };

  const handleUpdateReminder = (medicationId: string) => {
    // In a real app, you would save this to a database.
    // For this prototype, the state is just managed locally.
    toast({
        title: "Reminder Updated",
        description: `Your reminder for ${userMedications.find(m=>m.id === medicationId)?.genericName} has been saved.`,
    });
  }


  const getReminderTime = (medicationId: string) => {
    return reminders.find(r => r.medicationId === medicationId)?.time;
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline text-foreground">
          Medication Reminders
        </h1>
      </div>
      <Card className="mt-4">
        <CardHeader>
            <CardTitle>Your Reminder Schedule</CardTitle>
            <CardDescription>Manage your daily medication reminders to stay on track.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {userMedications.map(med => {
                const reminderTime = getReminderTime(med.id);
                return (
                    <div key={med.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg bg-secondary gap-4">
                        <div className="flex items-center gap-4">
                            <Pill className="h-6 w-6 text-primary"/>
                            <div>
                                <h3 className="font-semibold text-foreground">{med.genericName}</h3>
                                <p className="text-sm text-muted-foreground">{med.brandNames.join(', ')}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            {reminderTime ? (
                                <>
                                    <Input 
                                        type="time" 
                                        value={reminderTime}
                                        onChange={(e) => handleTimeChange(med.id, e.target.value)}
                                        className="w-full sm:w-auto"
                                    />
                                    <Button onClick={() => handleUpdateReminder(med.id)}>Update</Button>
                                </>
                            ) : (
                                <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleSetReminder(med.id)}>
                                    <PlusCircle className="mr-2 h-4 w-4"/>
                                    Add Reminder
                                </Button>
                            )}
                        </div>
                    </div>
                )
            })}
             {userMedications.length === 0 && (
                 <div className="flex flex-col items-center justify-center text-center py-12">
                    <BellRing className="h-12 w-12 text-muted-foreground" />
                    <h3 className="text-xl font-bold tracking-tight font-headline text-foreground mt-4">
                        No Medications Added
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Add medications to your profile to set reminders.
                    </p>
                    <Button className="mt-4">Add Medications</Button>
                 </div>
            )}
        </CardContent>
      </Card>
    </>
  );
}
