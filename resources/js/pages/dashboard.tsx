import { CardDashboard } from "@/components/custom/card-dashboard";
import { PaymentListCard } from "@/components/custom/payment-list-card";
import { SkeletonCardDashboard } from "@/components/custom/skeleton-card-dashboard";
import { SkeletonDashboardList } from "@/components/custom/skeleton-dashboard-list";
import useCurrency from "@/hooks/use-currency";
import AppLayout from "@/layouts/app-layout";
import { CardProps, SharedData, type BreadcrumbItem } from "@/types";
import { Head, usePage, WhenVisible } from "@inertiajs/react";
import { BookOpen, DollarSign, ListCheck, ListTodo, UserRound } from "lucide-react";
import { TbMoneybag } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { getAccess } from "@/layouts/authorized-layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dasbor",
    href: "/dashboard",
  },
];

interface Props extends SharedData {
  cards: {
    user_card: CardProps;
    task_card: CardProps;
    execution_task_card: CardProps;
    kas_card: CardProps;
    mykas: CardProps;
    matkul_card: CardProps; 
    semester_card: CardProps;
  };
}

export default function Dashboard() {
  const {
    cards,
    auth: { user },
  } = usePage<Props>().props;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dasbor" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <WhenVisible data="cards" fallback={<SkeletonCardDashboard />}>
          <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {getAccess(user.role, ["superadmin", "kosma", "wakosma"]) && (
              <CardDashboard
                className="col-span-1 sm:col-span-2"
                title={cards.user_card.title}
                icon={UserRound}
                value={cards.user_card.count}
                />
              )}
            <CardDashboard
              className={cn("col-span-1",
                !getAccess(user.role, ["superadmin", "kosma", "wakosma"]) && "sm:col-span-2"
              )}
              title={cards.matkul_card.title}
              icon={BookOpen}
              value={cards.matkul_card.count}
            />
            <CardDashboard
              className={cn("col-span-1",
                !getAccess(user.role, ["superadmin", "kosma", "wakosma"]) && "sm:col-span-2"
              )}
              title={cards.semester_card.title}
              icon={PiStudent}
              value={cards.semester_card.count || "Belum ada."}
            />
            <CardDashboard
              title={cards.kas_card.title}
              icon={DollarSign}
              value={useCurrency(cards.kas_card.count)}
            />
            <CardDashboard
              title={cards.mykas.title}
              icon={TbMoneybag}
              value={useCurrency(cards.mykas.count)}
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
        </WhenVisible>
        <WhenVisible
          data="payment_kas"
          fallback={
            <div className="relative grid h-auto min-h-80 flex-1 grid-cols-1 gap-4 overflow-hidden rounded-xl lg:grid-cols-7">
              <SkeletonDashboardList className="col-span-1 lg:col-span-7" />
            </div>
          }
        >
          <div className="relative grid h-auto min-h-80 flex-1 grid-cols-1 gap-4 overflow-hidden rounded-xl lg:grid-cols-7">
            <PaymentListCard />
          </div>
        </WhenVisible>
      </div>
    </AppLayout>
  );
}
