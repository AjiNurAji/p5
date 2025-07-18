"use client";

import { DatePicker } from "@/components/custom/date-picker";
import { ActionsDialog } from "@/components/custom/dialogs/actions-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Matkul } from "@/pages/matkul/components/data/schema";
import { TaskType } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: TaskType | null;
  matkuls: Matkul[] | null;
}

type TaskForm = {
  task: string;
  id_matkul: string;
  deadline: Date;
};

export const TaskActionDialog = ({ currentRow, open, onOpenChange, matkuls }: Props) => {
  const isEdit = !!currentRow;

  const { data, setData, post, processing } = useForm<Required<TaskForm>>(
    isEdit
      ? {
        task: currentRow.task,
        id_matkul: currentRow.matkul.id_matkul,
        deadline: currentRow.deadline,
      }
      : {
        task: "",
        id_matkul: "",
        deadline: new Date(),
      },
  );

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const loading = toast.loading("Menyimpan data...");

    post(isEdit ? route("tasks.update", currentRow.id_task) : route("tasks.store"), {
      onSuccess: (e) => toast.success(e.props.success.message, { id: loading }),
      onError: (e) => {
        if (e?.message) {
          return toast.error(e?.message, { id: loading });
        } else if (e?.task) {
          return toast.error(e?.task, { id: loading });
        } else if (e?.id_matkul) {
          return toast.error(e?.id_matkul, { id: loading });
        } else if (e?.deadline) {
          return toast.error(e?.deadline, { id: loading });
        } else if (e?.role) {
          return toast.error(e?.role, { id: loading });
        }

        return toast.error("Terjadi kesalahan, silahkan coba lagi!");
      },
      onFinish: () => {
        onOpenChange(false);
        handleResetForm();
      },
    });
  };

  const handleResetForm = () => {
    setData({
      task: "",
      id_matkul: "",
      deadline: new Date(),
    });
  };

  return (
    <ActionsDialog
      handleResetForm={handleResetForm}
      processing={processing}
      formName="task-form"
      currentRow={currentRow}
      open={open}
      onOpenChange={onOpenChange}
      title="Tugas"
    >
      <form id="task-form" onSubmit={handleSubmit} className="space-y-4 p-0.5">
        <div className="grid gap-2">
          <Label htmlFor="task">Tugas</Label>

          <Textarea
            placeholder="Ketik tugas disini..."
            className="h-25 resize-none text-sm"
            id="task"
            name="task"
            value={data.task}
            onChange={(e) => setData("task", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Mata Kuliah</Label>

          <Select value={data.id_matkul} defaultValue={currentRow?.matkul.id_matkul} onValueChange={(e) => setData("id_matkul", e)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih mata kuliah" />
            </SelectTrigger>
            <SelectContent>
              {matkuls?.map((r) => (
                <SelectItem key={r.id_matkul} value={r.id_matkul}>
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker withTime value={new Date(data.deadline)} keyName="deadline" setValue={setData} />
        </div>
      </form>
    </ActionsDialog>
  );
};
