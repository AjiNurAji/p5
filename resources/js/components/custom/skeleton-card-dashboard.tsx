import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const SkeletonCardDashboard = () => {
  return (
    <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="pt-0 col-span-1 sm:col-span-2">
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
      <Card className="pt-0 col-span-1 sm:col-span-2">
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
