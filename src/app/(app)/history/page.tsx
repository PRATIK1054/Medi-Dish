import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline text-foreground">
          Interaction History
        </h1>
      </div>
      <Card className="mt-4">
        <CardContent className="flex flex-1 items-center justify-center rounded-lg py-16">
          <div className="flex flex-col items-center gap-1 text-center">
            <History className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight font-headline text-foreground">
              Coming Soon
            </h3>
            <p className="text-sm text-muted-foreground">
              Your past interaction checks will be saved here.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
