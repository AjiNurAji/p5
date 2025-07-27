import Heading from "@/components/heading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppLayout from "@/layouts/app-layout";
import { AuthorizedLayout } from "@/layouts/authorized-layout";
import { BreadcrumbItem, Matkul, Semester, SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { matkulListSchema } from "./components/data/schema";
import { MatkulsDialogs } from "./components/dialogs/matkuls-dialogs";
import { MatkulsButton } from "./components/matkuls-button";
import { columns } from "./components/tables/matkul-columns";
import { MatkulTable } from "./components/tables/matkul-table";
import MatkulsProvider from "./context/matkuls-context";
import { AlertTriangle } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "mata kuliah",
    href: route("matkul.index"),
  },
];

const Matkuls = () => {
  const { matkuls, semester } = usePage<
    SharedData & { semester: Semester; matkuls: Matkul[] }
  >().props;

  const matkulList = matkulListSchema.parse(matkuls);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <MatkulsProvider>
        <Head title="Mata Kuliah" />
        <AuthorizedLayout
          canAccess={["superadmin", "kosma", "wakosma", "sekertaris"]}
        >
          <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            {!semester && (
              <Alert variant="destructive" className="animate-pulse">
                <AlertTriangle />
                <AlertDescription>
                  Silahkan tambahkan semester terlebih dahulu!
                </AlertDescription>
              </Alert>
            )}

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

          <MatkulsDialogs />
        </AuthorizedLayout>
      </MatkulsProvider>
    </AppLayout>
  );
};

export default Matkuls;
