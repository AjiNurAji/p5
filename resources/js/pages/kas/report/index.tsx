import { CardDashboard } from "@/components/custom/card-dashboard";
import Heading from "@/components/heading";
import useCurrency from "@/hooks/use-currency";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, CardProps, SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { TbCash, TbTransfer } from "react-icons/tb";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaRupiahSign } from "react-icons/fa6";

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
    cash: CardProps;
    cashless: CardProps;
    total: CardProps;
    expand: CardProps;
  };
};

const Report = () => {
  const page = usePage<ReportProps>();
  const {
    cards: { cash, cashless, total, expand },
  } = page.props;
  return (
    <AppLayout breadcrumbs={breadcrumb}>
      <Head title="Laporan Kas" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <Heading
            title="Laporan Kas"
            description="Laporan kas kini lebih transparan dan terkontrol, pantau setiap transaksi dengan mudah!"
          />
          {/* {getAccess(user.role, [
            "superadmin",
            "bendahara",
            "kosma",
            "wakosma",
          ]) && <KasButton />} */}
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <div className="grid auto-rows-min gap-4 sm:grid-cols-2">
            <CardDashboard
              title={total.title}
              value={useCurrency(total.count)}
              icon={FaRupiahSign}
            />
            <CardDashboard
              title={expand.title}
              value={useCurrency(expand.count)}
              icon={FaRegPaperPlane}
            />
            <CardDashboard
              title={cash.title}
              value={useCurrency(cash.count)}
              icon={TbCash}
            />
            <CardDashboard
              title={cashless.title}
              value={useCurrency(cashless.count)}
              icon={TbTransfer}
            />
          </div>
          {/* <KasTable
            data={kasList}
            columns={columns}
            all={all}
            setAll={setAll}
          /> */}
        </div>
      </div>
    </AppLayout>
  );
};

export default Report;
