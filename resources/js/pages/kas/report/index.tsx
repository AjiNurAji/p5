import { CardDashboard } from "@/components/custom/card-dashboard";
import Heading from "@/components/heading";
import useCurrency from "@/hooks/use-currency";
import AppLayout from "@/layouts/app-layout";
import { getAccess } from "@/layouts/authorized-layout";
import { BreadcrumbItem, CardProps, Kas, SharedData } from "@/types";
import { Head, usePage, WhenVisible } from "@inertiajs/react";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { columns } from "../components/table/kas-column";
import { KasTable } from "../components/table/kas-table";
import KasProvider from "../context/kas-context";
import { kasListSchema } from "../data/schema";
import { CardSkeleton } from "./components/card-skeleton";

const breadcrumb: BreadcrumbItem[] = [
  {
    title: "Kas",
    href: route("kas.index"),
  },
  {
    title: "Laporan Kas",
    href: route("kas.report"),
  },
];

type ReportProps = SharedData & {
  cards: {
    total: CardProps;
    week_payment: CardProps;
  };
  kaslist: Kas[];
};

const Report = () => {
  const page = usePage<ReportProps>();
  const {
    kaslist,
    auth: { user },
    cards: { total, week_payment },
  } = page.props;

  const kasList = kasListSchema.parse(
    kaslist.filter(({ id_number }) => id_number === user.id_number),
  );

  return (
    <AppLayout breadcrumbs={breadcrumb}>
      <Head title="Laporan Kas" />
      <KasProvider>
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
            <Heading
              title="Laporan Kas"
              description="Laporan kas kini lebih transparan dan terkontrol, pantau setiap transaksi dengan mudah!"
            />
          </div>
          <WhenVisible data="cards" fallback={<CardSkeleton />}>
            <div className="grid auto-rows-min gap-4 sm:grid-cols-2">
              <CardDashboard
                title={total.title}
                value={useCurrency(total.count)}
                icon={GrMoney}
              />
              <CardDashboard
                title={week_payment.title}
                value={week_payment.count}
                icon={FaRegMoneyBill1}
              />
            </div>
          </WhenVisible>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
              <KasTable data={kasList} columns={columns} />
          </div>
        </div>
      </KasProvider>
    </AppLayout>
  );
};

export default Report;
