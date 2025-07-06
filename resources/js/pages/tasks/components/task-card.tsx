import { formatDate } from "@/components/custom/date-picker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Matkul, SharedData } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { NotebookTabs, CalendarCheck, Edit3, Trash2 } from "lucide-react";
import { PiChalkboardTeacherLight } from "react-icons/pi";

interface TaskCardProps {
  task: string;
  matkul: Matkul;
  deadline: Date;
  id_task: string;
}

type ExecutionTaskForm = {
  id_task: string;
  id_number: string;
};

export const TaskCard = ({ task, id_task, matkul, deadline }: TaskCardProps) => {
  const { auth: { user } } = usePage<SharedData>().props;

  // const {} = useForm<Required<ExecutionTaskForm>>({
  //   id_task,
  //   id_number,
  //   status
  // });

  return (
    <Card className="p-0 gap-0">
      <CardHeader className="px-3 py-2 w-full flex items-center">
        <div className="flex items-center gap-1">
          <NotebookTabs className="size-4" />
          <h2 className="text-sm font-medium">{matkul.name}</h2>
        </div>
        <Badge className="ml-auto bg-yellow-500/20 text-yellow-500">
          Semester {matkul.semester}
        </Badge>
      </CardHeader>
      <Separator />
      <CardContent className="p-3">
        <p className="">{task}</p>
      </CardContent>
      <Separator />
      <CardFooter className="px-3 pb-2 flex flex-col gap-2">
        <div className="mt-2 w-full flex gap-2 items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <CalendarCheck className="size-4" />
            <span className="text-xs">{formatDate(new Date(deadline))}</span>
          </div>
          <Badge className="ml-auto" variant="secondary">
            <PiChalkboardTeacherLight className="size-7" />
            <span className="text-xs font-medium">{matkul.lecturer}</span>
          </Badge>
        </div>
        <div className="flex justify-between items-center w-full gap-2 flex-wrap">
          <Button size="sm" className="text-xs">
            Kerjakan
          </Button>
          {user.role !== "member" && (
            <div className="space-x-2">
              <Button size="icon" variant="outline">
                <Edit3 className="size-4" />
              </Button>
              <Button size="icon" variant="outline" className="bg-destructive/15 text-destructive hover:bg-destructive/25 hover:text-red-500">
                <Trash2 className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}