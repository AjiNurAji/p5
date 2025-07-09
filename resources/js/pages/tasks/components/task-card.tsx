import { formatDate } from "@/components/custom/date-picker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Matkul } from "@/pages/matkul/components/data/schema";
import { SharedData, User } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { CalendarCheck, Edit3, Loader, NotebookTabs, Trash2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { useTasks } from "../context/tasks-context";

interface TaskCardProps {
  props: {
    task: string;
    matkul: Matkul;
    deadline: Date;
    id_task: string;
    execution: {
      id_task: string;
      id_number: string;
      status: string;
    }[];
  };
}

type ExecutionTaskForm = {
  id_task: string;
  id_number: string;
};

export const TaskCard = ({ props }: TaskCardProps) => {
  const {
    auth: { user },
  } = usePage<SharedData>().props;
  const { setOpen, setCurrentRow } = useTasks();

  const execution_data = props.execution?.filter(({ id_number }) => user.id_number === id_number)[0] || null;

  const { post, data, setData, processing } = useForm<Required<ExecutionTaskForm>>({
    id_task: props.id_task,
    id_number: user.id_number,
  });

  const handleTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const loading = toast.loading("Memproses data...");

    post(!execution_data ? route("execution.store") : route("execution.update", { id_task: props.id_task, id_number: user.id_number }), {
      onSuccess: (e) => toast.success(e.props.success.message, { id: loading }),
      onError: (e) => {
        if (e?.message) {
          return toast.error(e?.message, { id: loading });
        } else if (e?.id_task) {
          return toast.error(e?.id_task, { id: loading });
        } else if (e?.id_number) {
          return toast.error(e?.id_number, { id: loading });
        } else if (e?.status) {
          return toast.error(e?.status, { id: loading });
        } else if (e?.role) {
          return toast.error(e?.role, { id: loading });
        }

        return toast.error("Terjadi kesalahan, silahkan coba lagi!", { id: loading });
      },
    });
  };

  return (
    <Card className="gap-0 overflow-hidden p-0">
      <CardContent className="overflow-hidden p-3 wrap-break-word">
        <p className="text-2xl">{props.task}</p>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col gap-2 px-3 pb-2">
        <div className="flex w-full items-center">
          <div className="flex w-fit items-center gap-1">
            <NotebookTabs className="size-4" />
            <h2 className="text-sm font-medium">{props.matkul.name}</h2>
          </div>
          <Badge className="ml-auto bg-yellow-500/20 text-xs text-yellow-500">Semester {props.matkul.semester}</Badge>
          <Badge
            className={cn("ml-2 text-xs capitalize", {
              "bg-red-500/20 text-red-500": !execution_data || execution_data?.status === "pending",
              "bg-blue-500/20 text-blue-500": execution_data?.status === "progress",
              "bg-green-500/20 text-green-500": execution_data?.status === "finished",
            })}
          >
            {!execution_data || execution_data?.status === "pending"
              ? "Belum dikerjakan"
              : execution_data?.status === "finished"
                ? "Sudah dikerjakan"
                : execution_data?.status}
          </Badge>
        </div>
        <Separator />
        <div className="mt-2 flex w-full items-center gap-2">
          <div className="flex items-center gap-1 text-muted-foreground">
            <CalendarCheck className="size-3 sm:size-4" />
            <span className="text-[10px] sm:text-xs">{formatDate(new Date(props.deadline))}</span>
          </div>
          <Badge className="ml-auto" variant="secondary">
            <PiChalkboardTeacherLight className="size-7" />
            <span className="text-[10px] font-medium sm:text-xs">{props.matkul.lecturer}</span>
          </Badge>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          {execution_data?.status !== "finished" ? (
            <Button size="sm" className="text-xs" onClick={(e) => handleTask(e)} disabled={processing}>
              {processing && <Loader className="h-4 w-4 animate-spin" />}
              {!execution_data ? "Kerjakan" : "Selesaikan"}
            </Button>
          ) : (
            <p className="text-sm">{props.execution?.length} Telah mengerjakan.</p>
          )}
          {user.role !== "member" && (
            <div className="space-x-2">
              <Button
                size="icon"
                onClick={() => {
                  setOpen("edit");
                  setCurrentRow(props);
                }}
                variant="outline"
              >
                <Edit3 className="size-4" />
              </Button>
              <Button
                size="icon"
                onClick={() => setOpen("delete")}
                variant="outline"
                className="bg-destructive/15 text-destructive hover:bg-destructive/25 hover:text-red-500"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
