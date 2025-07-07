import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator";

export interface CardDashboardProps {
  title: string;
  icon: LucideIcon;
  value: number | string;
}

export const CardDashboard = ({ title, icon: Icon, value }: CardDashboardProps) => {
  return (
    <Card className="gap-2 px-3 py-2">
      <CardHeader className='flex flex-row items-center justify-between space-y-0 p-0'>
        <CardTitle className='text-sm font-medium capitalize p-0'>
          {title}
        </CardTitle>
        <Icon className='text-muted-foreground size-4.5' />
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <div className='text-2xl font-bold text-center'>{value}</div>
      </CardContent>
    </Card>
  )
}