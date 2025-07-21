import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

export interface CardDashboardProps {
  title: string;
  icon: LucideIcon;
  value: number | string;
}

export const CardDashboard = ({ title, icon: Icon, value }: CardDashboardProps) => {
  return (
    <Card className="pt-0">
      <CardContent className="px-6 flex flex-wrap gap-2 justify-between pt-6">
        <div>
          <p className="text-muted-foreground text-xs tracking-wide uppercase">{title}</p>
          <div className="mt-1">
            <h3 className="text-xl font-medium">{value}</h3>
          </div>
        </div>
        <div className="bg-primary/10 flex h-[46px] w-[46px] items-center justify-center rounded-lg">
          <Icon className="text-primary h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  )
}