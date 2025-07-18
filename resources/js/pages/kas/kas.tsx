import Heading from "@/components/heading";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Kas, SharedData, User } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { KasButton } from "./components/kas-button";
import KasProvider from "./context/kas-context";
import { kasListSchema } from "./data/schema";
import { KasDialogs } from "./components/dialogs/kas-dialogs";
import { KasTable } from "./components/table/kas-table";
import { columns } from "./components/table/kas-column";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Kas",
    href: route("kas.index"),
  },
];

interface KasListProps {
  list: Kas[];
  cash: number;
  cashless: number;
}

interface Props extends SharedData {
  kaslist: Kas[];
  userKasList: KasListProps;
  users: User[] | null;
}

const KasPage = ({ kaslist, users, userKasList, auth: { user } }: Props) => {
  const [all, setAll] = useState<boolean>(true);
  const kasList = kasListSchema.parse(
    user.role === "member" ? userKasList.list : all ? kaslist : userKasList.list,
  );

  console.log(kasList)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <KasProvider>
        <Head title="Kas" />
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
            <Heading
              title="Pembayaran Kas"
              description="Pembayaran kas kini lebih transparan dan terkontrol, pantau setiap transaksi dengan mudah!"
            />
            {user.role !== "member" && <KasButton />}
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
            <KasTable data={kasList} columns={columns} />
          </div>
        </div>

        <KasDialogs users={users} />
      </KasProvider>
    </AppLayout>
  );
};

export default KasPage;
