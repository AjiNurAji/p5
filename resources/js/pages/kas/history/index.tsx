import AppLayout from "@/layouts/app-layout";
import { AuthorizedLayout } from "@/layouts/authorized-layout";
import { Head } from "@inertiajs/react";
import Heading from "@/components/heading";
import { KasTable } from "../components/table/kas-table";
import { BreadcrumbItem, Kas, SharedData, User } from "@/types";
import { kasListSchema } from "../data/schema";
import { columns } from "../components/table/kas-column";
import KasProvider from "../context/kas-context";
import { KasDialogs } from "../components/dialogs/kas-dialogs";

type Props = {
  kaslist: Kas[];
  users: User[];
} & SharedData;

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Kas",
    href: route("kas.index"),
  },
  {
    title: "Riwayat Transaksi Kas",
    href: route("kas.history"),
  }
];

const HistoryPage = ({ kaslist, users }: Props) => {
  const kasList = kasListSchema.parse(kaslist);
  const Access = ["superadmin", "bendahara", "kosma"];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AuthorizedLayout canAccess={Access}>
        <KasProvider>
          <Head title="Riwayat Transaksi Kas" />
          <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
              <Heading
                title="Riwayat Transaksi Kas"
                description="Transaksi kas kini lebih transparan dan terkontrol, pantau setiap transaksi dengan mudah!"
              />
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
              <KasTable
                data={kasList}
                columns={columns}
              />
            </div>
          </div>

          <KasDialogs users={users} />
        </KasProvider>
      </AuthorizedLayout>
    </AppLayout>
  );
};

export default HistoryPage;
