
import { Suspense } from 'react';
import CheckInteractionClientPage from './client-page';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <div className="w-full max-w-lg mx-auto space-y-4 pt-10">
                <Skeleton className="h-10 w-1/3 mx-auto" />
                <Skeleton className="h-8 w-2/3 mx-auto" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    );
}

export default function CheckInteractionPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CheckInteractionClientPage />
    </Suspense>
  );
}
