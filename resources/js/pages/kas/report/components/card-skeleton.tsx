import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CardSkeleton = () => {
  return (
    <div className="grid auto-rows-min gap-4 sm:grid-cols-2">
      <Card className="pt-0">
        <CardContent className="flex flex-wrap justify-between gap-2 px-6 pt-6">
          <div>
            <Skeleton className="h-4 w-25" />
            <div className="mt-1">
              <Skeleton className="h-7 w-25" />
            </div>
          </div>
          <Skeleton className="h-[46px] w-[46px]" />
        </CardContent>
      </Card>
      <Card className="pt-0">
        <CardContent className="flex flex-wrap justify-between gap-2 px-6 pt-6">
          <div>
            <Skeleton className="h-4 w-25" />
            <div className="mt-1">
              <Skeleton className="h-7 w-25" />
            </div>
          </div>
          <Skeleton className="h-[46px] w-[46px]" />
        </CardContent>
      </Card>
    </div>
  );
};
