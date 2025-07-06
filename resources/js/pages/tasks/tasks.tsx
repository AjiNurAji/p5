import Heading from "@/components/heading";
import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, SharedData, Task } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import TasksProvider from "./context/tasks-context";
import { Matkul } from "../matkul/components/data/schema";
import { TaskDialogs } from "./components/dialogs/task-dialogs";
import { TaskButton } from "./components/task-buttons";
import { TaskCard } from "./components/task-card";
import { formatDate } from "@/components/custom/date-picker";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tugas',
    href: route('tasks.index'),
  },
];

interface Props extends SharedData {
  tasks: {
    id_task: string;
    task: string;
    deadline: Date;
    matkul: Matkul;
  }[];
  matkuls: Matkul[];
}

const TaskPage = () => {
  const { tasks, matkuls, auth: { user } } = usePage<Props>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Tugas" />
      <TasksProvider matkuls={matkuls}>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
          <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
            <Heading title="Daftar Tugas" description="Kelola daftar tugas yang harus diselesaikan di halaman ini." />
            {user.role !== "member" && <TaskButton />}
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
            {tasks.length ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {tasks.map(({ task, id_task, matkul, deadline }) =>  (
                    <TaskCard task={task} key={id_task} matkul={matkul} deadline={deadline} id_task={id_task} />
                  )
                )}
              </div>
            ) : (
              <Card>
                <CardContent>
                  <p className="text-center w-full">Belum ada tugas yang ditambahkan.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <TaskDialogs />
      </TasksProvider>
    </AppLayout>
  )
}

export default TaskPage;