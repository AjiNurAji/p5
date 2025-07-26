import Heading from "@/components/heading";
import AppLayout from "@/layouts/app-layout";
import { AuthorizedLayout } from "@/layouts/authorized-layout";
import { BreadcrumbItem, Semester as SemesterType, SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { semesterListSchema } from "./components/data/schema";
import { SemesterDialogs } from "./components/dialogs/semester-dialogs";
import { SemesterButton } from "./components/semester-button";
import { columns } from "./components/tables/semester-columns";
import { SemesterTable } from "./components/tables/semester-table";
import SemesterProvider from "./context/semester-context";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "semester",
    href: route("semester.index"),
  },
];

interface Props extends SharedData {
  data: SemesterType[];
}

const Semester = () => {
  const {
    data
  } = usePage<Props>().props;

  const semesterList = semesterListSchema.parse(data);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <SemesterProvider>
        <Head title="Semester" />
        <AuthorizedLayout canAccess={["superadmin", "kosma", "wakosma", "sekertaris"]}>
          <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
              <Heading
                title="Semester Perkuliahan"
                description="Tambah dan kelola daftar semester untuk kebutuhan akademik."
              />
              <SemesterButton />
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
              <SemesterTable data={semesterList} columns={columns} />
            </div>
          </div>

          <SemesterDialogs />
        </AuthorizedLayout>
      </SemesterProvider>
    </AppLayout>
  );
};

export default Semester;
