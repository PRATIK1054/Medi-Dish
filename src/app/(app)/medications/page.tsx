
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, PlusCircle, Trash2 } from "lucide-react";
import { userProfile, medications as allMedications } from "@/lib/data";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function MedicationsPage() {
    const [userMedications, setUserMedications] = useState(
        allMedications.filter(m => userProfile.medications.includes(m.id))
    );
    const { toast } = useToast();

    const handleRemoveMedication = (medicationId: string) => {
        setUserMedications(currentMeds => currentMeds.filter(m => m.id !== medicationId));
        toast({
            title: "Medication Removed",
            description: `${allMedications.find(m => m.id === medicationId)?.genericName} has been removed from your list.`,
        });
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl font-headline text-foreground">
                    My Medications
                </h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Medication
                </Button>
            </div>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Your Medication List</CardTitle>
                    <CardDescription>
                        Here is a list of your current medications. You can check for interactions or remove them.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {userMedications.length > 0 ? (
                        userMedications.map(med => (
                            <div key={med.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg bg-secondary gap-4">
                                <div className="flex items-center gap-4">
                                    <Pill className="h-6 w-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold text-foreground">{med.genericName}</h3>
                                        <p className="text-sm text-muted-foreground">{med.brandNames.join(', ')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 self-end sm:self-center">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/check?medication=${encodeURIComponent(med.genericName)}`}>
                                            Check
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveMedication(med.id)}>
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Remove</span>
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-12">
                            <Pill className="h-12 w-12 text-muted-foreground" />
                            <h3 className="text-xl font-bold tracking-tight font-headline text-foreground mt-4">
                                No Medications Added
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                Add your medications to start managing them.
                            </p>
                            <Button className="mt-4">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Your First Medication
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    );
}
