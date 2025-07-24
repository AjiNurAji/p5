import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const SkeletonDashboardList = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="capitalize">
          <Skeleton className="h-7 w-25" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-60" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-50 w-full" />
      </CardContent>
    </Card>
  );
};
