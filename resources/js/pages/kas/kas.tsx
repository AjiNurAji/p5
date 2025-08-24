import { CardDashboard } from "@/components/custom/card-dashboard";
import Heading from "@/components/heading";
import useCurrency from "@/hooks/use-currency";
import AppLayout from "@/layouts/app-layout";
import { AuthorizedLayout, getAccess } from "@/layouts/authorized-layout";
import { BreadcrumbItem, CardProps, SharedData, User } from "@/types";
import { Head } from "@inertiajs/react";
import { FaRegPaperPlane, FaRupiahSign } from "react-icons/fa6";
import { TbCash, TbTransfer } from "react-icons/tb";
import { CardBillAdded } from "./components/card-bill-added";
import { KasDialogs } from "./components/dialogs/kas-dialogs";
import { KasButton } from "./components/kas-button";
import { billColumns } from "./components/table/bill-column";
import { BillTable } from "./components/table/bill-table";
import { kasOfWeekColumn } from "./components/table/kas-of-week-column";
import { KasOfWeekTable } from "./components/table/kas-of-week-table";
import KasProvider from "./context/kas-context";
import { billListSchema } from "./data/bill-schema";
import { KasOfWeek, kasOfWeekListSchema } from "./data/kas-of-week-schema";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Kas",
    href: route("kas.index"),
  },
];

interface Props extends SharedData {
  kaslist: KasOfWeek[];
  users: User[] | null;
  cards: {
    cash: CardProps;
    cashless: CardProps;
    total: CardProps;
    expand: CardProps;
  };
  bills: Array<{ name: string; date_of_bill: Date }>;
}

const KasPage = ({
  kaslist,
  users,
  auth: { user },
  cards: { cash, cashless, total, expand },
  bills,
}: Props) => {
  const kasList = kasOfWeekListSchema.parse(
    kaslist.filter(
      ({ id_number }) => id_number !== import.meta.env.VITE_EXPEND_ID,
    ),
  );
  const billList = billListSchema.parse(bills);

  const Access = ["superadmin", "bendahara", "kosma"];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AuthorizedLayout canAccess={Access}>
        <KasProvider>
          <Head title="Kas" />
          <div className="inline-grid overflow-hidden rounded-xl">
            <div className="inline-flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl border-b border-border p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                <Heading
                  title="Pembayaran Kas"
                  description="Pembayaran kas kini lebih transparan dan terkontrol, pantau setiap transaksi dengan mudah!"
                />
                {getAccess(user.role, Access) && <KasButton />}
              </div>
              <div className="grid auto-rows-min gap-4 sm:grid-cols-2">
                <CardDashboard
                  title={total.title}
                  value={useCurrency(total.count)}
                  icon={FaRupiahSign}
                  className="w-full"
                />
                <CardDashboard
                  title={expand.title}
                  value={useCurrency(expand.count)}
                  icon={FaRegPaperPlane}
                  className="w-full"
                />
                <CardDashboard
                  title={cash.title}
                  value={useCurrency(cash.count)}
                  icon={TbCash}
                  className="w-full"
                />
                <CardDashboard
                  title={cashless.title}
                  value={useCurrency(cashless.count)}
                  icon={TbTransfer}
                  className="w-full"
                />
                <CardBillAdded className="col-span-2" />
              </div>
              <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                <KasOfWeekTable data={kasList} columns={kasOfWeekColumn} />
              </div>
            </div>
            <div className="inline-flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                <Heading
                  title="Daftar Tagihan"
                  description="Daftar Tagihan kas"
                />
              </div>
              <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                <BillTable data={billList} columns={billColumns} />
              </div>
            </div>
          </div>

          <KasDialogs users={users} />
        </KasProvider>
      </AuthorizedLayout>
    </AppLayout>
  );
};

export default KasPage;
