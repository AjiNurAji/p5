import { ErrorPage } from "@/components/errors/error-page";
import Heading from "@/components/heading";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { matkulListSchema } from "./components/data/schema";
import { MatkulsDialogs } from "./components/dialogs/matkuls-dialogs";
import { MatkulsButton } from "./components/matkuls-button";
import { columns } from "./components/tables/matkul-columns";
import { MatkulTable } from "./components/tables/matkul-table";
import MatkulsProvider from "./context/matkuls-context";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "mata kuliah",
    href: route("matkul.index"),
  },
];

const Matkuls = () => {
  const {
    matkuls,
    auth: { user },
  } = usePage<SharedData>().props;

  const matkulList = matkulListSchema.parse(matkuls);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <MatkulsProvider>
        <Head title="Mata Kuliah" />
        {user.role === "member" ? (
          <ErrorPage
            code={403}
            withDashBtn
            error="Akses Dibatasi!"
            message={
              <p>
                Upss! Anda tidak memiliki izin <br />
                untuk melihat halaman ini.
              </p>
            }
          />
        ) : (
          <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
              <Heading
                title="Daftar Mata Kuliah"
                description="Pantau dan kelola mata kuliah untuk mendukung proses pembelajaran yang lebih terstruktur."
              />
              <MatkulsButton />
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
              <MatkulTable data={matkulList} columns={columns} />
            </div>
          </div>
        )}

        <MatkulsDialogs />
      </MatkulsProvider>
    </AppLayout>
  );
};

export default Matkuls;
