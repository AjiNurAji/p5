import { formatDate } from "@/components/custom/date-picker";
import ShowMarkdown from "@/components/custom/show-markdown";
import { TableRowActions } from "@/components/custom/table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useInitials } from "@/hooks/use-initials";
import { cn } from "@/lib/utils";
import { Matkul } from "@/pages/matkul/components/data/schema";
import { SharedData, User } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import { CalendarCheck, Ellipsis, Loader } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useTasks } from "../context/tasks-context";

interface TaskCardProps {
  props: {
    task: string;
    matkul: Matkul;
    markdown: string;
    deadline: Date;
    id_task: string;
    execution: {
      id_task: string;
      id_number: string;
      status: string;
      updated_at: string;
      user: User;
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

  const execution_data =
    props.execution?.filter(
      ({ id_number }) => user.id_number === id_number,
    )[0] || null;

  const { post, data, setData, processing } = useForm<
    Required<ExecutionTaskForm>
  >({
    id_task: props.id_task,
    id_number: user.id_number,
  });

  const deadline = formatDate(new Date(props.deadline));
  const getInitials = useInitials();

  const handleTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const loading = toast.loading("Memproses data...");

    post(
      !execution_data
        ? route("execution.store")
        : route("execution.update", {
            id_task: props.id_task,
            id_number: user.id_number,
          }),
      {
        onSuccess: (e) =>
          toast.success(e.props.success.message, { id: loading }),
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

          return toast.error("Terjadi kesalahan, silahkan coba lagi!", {
            id: loading,
          });
        },
      },
    );
  };

  return (
    <Card className="h-auto gap-0 overflow-hidden p-0">
      <CardHeader className="px-3 py-2">
        <div className="flex w-full items-center">
          <div className="flex w-fit flex-col items-start gap-0.5">
            <h2 className="text-sm font-medium">{props.matkul.name}</h2>
            <p className="text-[10px] font-normal text-muted-foreground">
              {props.matkul.lecturer}
            </p>
          </div>
          <div className="ml-auto flex flex-wrap justify-end gap-1">
            <Badge className="bg-yellow-500/20 text-[10px] text-yellow-500">
              Semester {props.matkul.semester.semester}
            </Badge>
            <Badge
              className={cn("text-[10px] capitalize", {
                "bg-red-500/20 text-red-500":
                  !execution_data || execution_data?.status === "pending",
                "bg-blue-500/20 text-blue-500":
                  execution_data?.status === "progress",
                "bg-green-500/20 text-green-500":
                  execution_data?.status === "finished",
              })}
            >
              {!execution_data || execution_data?.status === "pending"
                ? "Belum dikerjakan"
                : execution_data?.status === "finished"
                  ? "Sudah dikerjakan"
                  : execution_data?.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden p-3 wrap-break-word">
        <ShowMarkdown markdown={props.markdown} />
      </CardContent>
      <CardFooter className="mt-auto flex flex-col gap-2 px-3 pb-2">
        <Separator />
        <div className="mt-2 flex w-full items-center gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarCheck className="size-3 sm:size-4" />
            <span className="text-[10px] sm:text-xs">{deadline}</span>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          {execution_data?.status !== "finished" ? (
            <Button
              size="sm"
              className="text-xs"
              onClick={(e) => handleTask(e)}
              disabled={processing}
            >
              {processing && <Loader className="h-4 w-4 animate-spin" />}
              {!execution_data ? "Kerjakan" : "Selesaikan"}
            </Button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={route("execution.index", props.id_task)}>
                  <div className="flex cursor-pointer -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                    {props.execution
                      ?.sort(
                        (a, b) =>
                          new Date(b.updated_at).getTime() -
                          new Date(a.updated_at).getTime(),
                      )
                      .slice(0, 3)
                      .map(({ user }) => (
                        <Avatar className="size-6" key={user.name}>
                          <AvatarImage
                            src={`/storage/${user.avatar}`}
                            className="w-full h-auto object-cover"
                            alt={user.name}
                          />
                          <AvatarFallback className="rounded-lg bg-neutral-200 text-sm text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    {props.execution.length > 4 && (
                      <Avatar className="size-6">
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-sm text-black dark:bg-neutral-700 dark:text-white">
                          <Ellipsis className="size-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="capitalize">sudah mengerjakan</p>
              </TooltipContent>
            </Tooltip>
          )}
          {user.role !== "member" && (
            <TableRowActions
              table={false}
              row={props}
              setCurrentRow={setCurrentRow}
              setOpen={setOpen}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
