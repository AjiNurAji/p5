import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem, Semester as SemesterType, SharedData } from "@/types";
import SemesterProvider from "./context/semester-context";
import { Head, usePage } from "@inertiajs/react";
import Heading from "@/components/heading";
import { ErrorPage } from "@/components/errors/error-page";
import { SemesterDialogs } from "./components/dialogs/semester-dialogs";
import { SemesterButton } from "./components/semester-button";
import { SemesterTable } from "./components/tables/semester-table";
import { columns } from "./components/tables/semester-columns";
import { semesterListSchema } from "./components/data/schema";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "semester",
    href: route("semester.index"),
  },
];

interface Props extends SharedData {
  data: SemesterType[],
}

const Semester = () => {
  const { data, auth: { user } } = usePage<Props>().props;

  const semesterList = semesterListSchema.parse(data);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <SemesterProvider>
        <Head title="Semester" />
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
                title="Semester Perkuliahan"
                description="Kelola semester perkulihan."
              />
              <SemesterButton />
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
              <SemesterTable data={semesterList} columns={columns} />
            </div>
          </div>
        )}

        <SemesterDialogs />
      </SemesterProvider>
    </AppLayout>
  )
}

export default Semester;