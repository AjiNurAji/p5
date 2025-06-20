import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export interface CardDashboardProps {
  title: string;
  icon: LucideIcon;
  value: number | string;
}

export const CardDashboard = ({ title, icon: Icon, value }: CardDashboardProps) => {
  return (
    <Card className="gap-4 p-0">
      <CardHeader className='flex flex-row items-center justify-between space-y-0 border-b border-border pt-4 pb-3'>
        <CardTitle className='text-sm font-medium capitalize'>
          {title}
        </CardTitle>
        <Icon className='text-muted-foreground h-4 w-4' />
      </CardHeader>
      <CardContent className="pb-4">
        <div className='text-2xl font-bold text-center'>{value}</div>
      </CardContent>
    </Card>
  )
}