import { CardDashboard } from "@/components/custom/card-dashboard";
import { RecentSales } from "@/components/custom/recent-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCurrency from "@/hooks/use-currency";
import AppLayout from "@/layouts/app-layout";
import { SharedData, type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { DollarSign, ListCheck, ListTodo, UserRound } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dasbor",
    href: "/dashboard",
  },
];

interface CardProps {
  title: string;
  count: number;
}
interface Props extends SharedData {
  cards: {
    user_card: CardProps;
    task_card: CardProps;
    execution_task_card: CardProps;
    kas_card: CardProps;
  };
}

export default function Dashboard() {
  const { cards } = usePage<Props>().props;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dasbor" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CardDashboard
            title={cards.user_card.title}
            icon={UserRound}
            value={cards.user_card.count}
          />
          <CardDashboard
            title={cards.kas_card.title}
            icon={DollarSign}
            value={useCurrency(cards.kas_card.count)}
          />
          <CardDashboard
            title={cards.task_card.title}
            icon={ListTodo}
            value={cards.task_card.count}
          />
          <CardDashboard
            title={cards.execution_task_card.title}
            icon={ListCheck}
            value={cards.execution_task_card.count}
          />
        </div>
        <div className="relative grid min-h-[100vh] flex-1 grid-cols-1 gap-4 overflow-hidden rounded-xl md:min-h-min lg:grid-cols-7">
          <Card className="col-span-1 lg:col-span-4">
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
          <Card className="col-span-1 lg:col-span-3">
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
