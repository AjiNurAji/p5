import Heading from "@/components/heading";
import AppLayout from "@/layouts/app-layout";
import { AuthorizedLayout, getAccess } from "@/layouts/authorized-layout";
import { BreadcrumbItem, CardProps, Kas, SharedData, User } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { KasDialogs } from "./components/dialogs/kas-dialogs";
import { KasButton } from "./components/kas-button";
import { columns } from "./components/table/kas-column";
import { KasTable } from "./components/table/kas-table";
import KasProvider from "./context/kas-context";
import { kasListSchema } from "./data/schema";
import { FaRegPaperPlane, FaRupiahSign } from "react-icons/fa6";
import useCurrency from "@/hooks/use-currency";
import { TbCash, TbTransfer } from "react-icons/tb";
import { CardDashboard } from "@/components/custom/card-dashboard";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Kas",
    href: route("kas.index"),
  },
];

interface Props extends SharedData {
  kaslist: Kas[];
  users: User[] | null;
  cards: {
    cash: CardProps;
    cashless: CardProps;
    total: CardProps;
    expand: CardProps;
  }
}

const KasPage = ({ kaslist, users, auth: { user }, cards: { cash, cashless, total, expand } }: Props) => {
  const [all, setAll] = useState<boolean>(true);
  const kasList = kasListSchema.parse(
    all
      ? kaslist
      : kaslist.filter(({ id_number }) => id_number === user.id_number),
  );

  const Access = ["superadmin", "bendahara", "kosma"];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AuthorizedLayout canAccess={Access}>
        <KasProvider>
          <Head title="Kas" />
          <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
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
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
              <KasTable
                data={kasList}
                columns={columns}
                all={all}
                setAll={setAll}
              />
            </div>
          </div>

          <KasDialogs users={users} />
        </KasProvider>
      </AuthorizedLayout>
    </AppLayout>
  );
};

export default KasPage;
