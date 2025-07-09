import Heading from "@/components/heading";
import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, SharedData, User } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Matkul } from "../matkul/components/data/schema";
import { TaskDialogs } from "./components/dialogs/task-dialogs";
import { TaskButton } from "./components/task-buttons";
import { TaskCard } from "./components/task-card";
import { TaskFilters } from "./components/task-filters";
import TasksProvider from "./context/tasks-context";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Tugas",
    href: route("tasks.index"),
  },
];

interface TasksProps {
  id_task: string;
  task: string;
  deadline: Date;
  matkul: Matkul;
  execution: {
    id_task: string;
    id_number: string;
    user: User;
    status: string;
  }[];
}

interface Props extends SharedData {
  tasks: TasksProps[];
  matkuls: Matkul[];
}

const getUserTaskStatus = (task: TasksProps, user: User, status?: string) => {
  const filter = task.execution.filter(
    ({ id_number }) => id_number === user.id_number,
  );

  if (status === "pending") {
    return filter;
  }

  if (filter.length) {
    return filter.filter((t) => t.status === status)[0]?.status;
  }

  return [];
};

const TaskPage = () => {
  const {
    tasks,
    matkuls,
    auth: { user },
  } = usePage<Props>().props;

  const [statusType, setStatusType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [matkulFilter, setMatkulFilter] = useState<Set<string>>(new Set());

  const filteredTasks = tasks
    .filter((task) =>
      statusType === "all"
        ? task
        : statusType === "pending"
          ? !getUserTaskStatus(task, user, "pending").length
          : statusType === "progress"
            ? getUserTaskStatus(task, user, "progress") === "progress"
            : statusType === "finished"
              ? getUserTaskStatus(task, user, "finished") === "finished"
              : [],
    )
    .filter((task) => {
      if (!matkulFilter.size) return true;

      return matkulFilter.has(task.matkul.id_matkul);
    })
    .filter((task) =>
      task.task.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Tugas" />
      <TasksProvider matkuls={matkuls}>
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
            <Heading
              title="Daftar Tugas"
              description="Kelola daftar tugas yang harus diselesaikan di halaman ini."
            />
            {user.role !== "member" && <TaskButton />}
          </div>
          <TaskFilters
            matkuls={matkuls}
            matkulFilter={matkulFilter}
            setMatkulFilter={setMatkulFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusType={statusType}
            setStatusType={setStatusType}
          />
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
            {tasks.length && filteredTasks.length ? (
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
                {filteredTasks.map((task) => (
                  <TaskCard key={task.id_task} props={task} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent>
                  <p className="w-full text-center">
                    {!tasks.length && !filteredTasks.length
                      ? "Belum ada tugas yang ditambahkan."
                      : "Tugas tidak ditemukan."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <TaskDialogs />
      </TasksProvider>
    </AppLayout>
  );
};

export default TaskPage;
