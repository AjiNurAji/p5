import Heading from "@/components/heading";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Matkul, SharedData, User } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { CardUserExecution } from "./components/card-user-execution";

interface Props extends SharedData {
  tasks: {
    task: string;
    matkul: Matkul;
    deadline: Date;
    id_task: string;
    execution: {
      id_task: string;
      id_number: string;
      status: string;
      updated_at: Date;
      user: User;
    }[];
  };
}

const ExecutionPage = () => {
  const { tasks } = usePage<Props>().props;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Tugas",
      href: route("tasks.index"),
    },
    {
      title: tasks.matkul.name,
      href: route("tasks.index"),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pengerjaan Tugas" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <Heading
            title="Daftar Pengerjaan Tugas"
            description={`Berikut ini adalah daftar yang sudah mengerjakan tugas ${tasks.matkul.name}`}
          />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tasks.execution.length ? (
              tasks.execution.map(({ id_number, user, updated_at }) => {
                return <CardUserExecution key={id_number} user={user} executionIn={updated_at} />;
              })
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <p className="text-center text-sm">
                  Belum ada yang mengerjakan tugas.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ExecutionPage;
