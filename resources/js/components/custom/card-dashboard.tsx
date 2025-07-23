import { WhenVisible } from "@inertiajs/react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export interface CardDashboardProps {
  title: string;
  icon: LucideIcon;
  value: number | string;
}

export const CardDashboard = ({
  title,
  icon: Icon,
  value,
}: CardDashboardProps) => {
  return (
    <Card className="pt-0">
      <CardContent className="flex flex-wrap justify-between gap-2 px-6 pt-6">
        <div>
          <WhenVisible
            data="title"
            fallback={<Skeleton className="h-4 w-25" />}
          >
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              {title}
            </p>
          </WhenVisible>
          <div className="mt-1">
            <WhenVisible
              data="value"
              fallback={<Skeleton className="h-7 w-25" />}
            >
              <h3 className="text-xl font-medium">{value}</h3>
            </WhenVisible>
          </div>
        </div>
        <WhenVisible
          data="icon"
          fallback={<Skeleton className="h-[46px] w-[46px]" />}
        >
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </WhenVisible>
      </CardContent>
    </Card>
  );
};
