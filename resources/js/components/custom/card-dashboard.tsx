import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { Card, CardContent } from "../ui/card";

export interface CardDashboardProps {
  title: string;
  icon: LucideIcon | IconType;
  value: number | string;
  className?: string;
}

export const CardDashboard = ({
  title,
  icon: Icon,
  value,
  className,
}: CardDashboardProps) => {
  return (
    <Card className={cn("pt-0", className)}>
      <CardContent className="flex flex-wrap-reverse justify-between gap-2 px-6 pt-6">
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            {title}
          </p>
          <div className="mt-1">
            <h3 className="text-xl font-medium">{value}</h3>
          </div>
        </div>
        <div className="flex h-[46px] w-[46px] items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
};
