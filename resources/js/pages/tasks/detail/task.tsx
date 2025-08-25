import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Matkul } from "@/pages/matkul/components/data/schema";
import { BreadcrumbItem, SharedData, User } from "@/types";
import { ArrowLeft } from "lucide-react";
import { TaskCard } from "../components/task-card";
import TasksProvider from "../context/tasks-context";

type Props = {
  task: {
    id_task: string;
    task: string;
    deadline: Date;
    matkul: Matkul;
    markdown: string;
    execution: {
      id_task: string;
      id_number: string;
      user: User;
      status: string;
      updated_at: string;
    }[];
  };
} & SharedData;

const DetailTask = ({ task }: Props) => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Tugas",
      href: route("tasks.index"),
    },
    {
      title: task.matkul.name,
      href: route("tasks.index"),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <TasksProvider>
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

          <Button size="sm" variant="destructive" className="w-fit" onClick={() => history.go(-1)}>
            <ArrowLeft />
          </Button>
          <TaskCard props={task} detail />
        </div>
      </TasksProvider>
    </AppLayout>
  );
};

export default DetailTask;
