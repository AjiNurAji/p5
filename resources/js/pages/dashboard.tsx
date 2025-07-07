import { CardDashboard } from '@/components/custom/card-dashboard';
import { RecentSales } from '@/components/custom/recent-sales';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { DollarSign, ListCheck, ListTodo, UserRound } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dasbor',
    href: '/dashboard',
  },
];

interface CardProps {
  title: string;
  count: number;
}

interface Props extends SharedData {
  user_card: CardProps;
  task_card: CardProps;
  execution_task_card: CardProps;
}

export default function Dashboard() {
  const { user_card, task_card, execution_task_card } = usePage<Props>().props;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dasbor" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CardDashboard title={user_card.title} icon={UserRound} value={user_card.count} />
          <CardDashboard title='Total Kas' icon={DollarSign} value={
            Intl.NumberFormat("en-ID", {
              style: 'currency',
              currency: 'IDR',
            }).format(150000)
          } />
          <CardDashboard title={task_card.title} icon={ListTodo} value={task_card.count} />
          <CardDashboard title={execution_task_card.title} icon={ListCheck} value={execution_task_card.count} />
        </div>
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min grid grid-cols-1 gap-4 lg:grid-cols-7">
          <Card className='col-span-1 lg:col-span-4'>
            <CardHeader>
              <CardTitle>Pembayaran Kas</CardTitle>
              <CardDescription>
                Total 24 transaksi kas bulan ini.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
          <Card className='col-span-1 lg:col-span-3'>
            <CardHeader>
              <CardTitle>Pembayaran Kas</CardTitle>
              <CardDescription>
                Total 24 transaksi kas bulan ini.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
