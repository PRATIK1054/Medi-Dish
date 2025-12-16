
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LearnPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline text-foreground">
          Learn About Medication Safety
        </h1>
      </div>
      <div className="grid gap-8 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Understanding Interactions</CardTitle>
            <CardDescription>
              Knowledge is the first step to safety. Learn more about how your food and medications can affect each other.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What does 'food-drug interaction' mean?</AccordionTrigger>
                <AccordionContent>
                  A food-drug interaction is when a food, beverage, or supplement changes the way a medicine works in your body. This can make the medicine less effective, increase its side effects, or even cause dangerous new symptoms. For example, some foods can block a medicine from being absorbed, while others can amplify its effects to toxic levels. This is why it's crucial to know which foods to be cautious of when taking certain medications.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What happens in the body if you miss a dosage?</AccordionTrigger>
                <AccordionContent>
                  Missing a dose can disrupt the steady level of medication your body needs to manage your health condition. For some drugs, like antibiotics or blood thinners, even one missed dose can reduce its effectiveness or increase health risks. Your body might not have enough of the drug to fight an infection, prevent a clot, or control blood pressure. Always consult your pharmacist or doctor about what to do if you miss a dose; the advice can vary significantly depending on the medication.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
