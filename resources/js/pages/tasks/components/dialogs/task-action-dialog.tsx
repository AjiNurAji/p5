"use client";

import { DatePicker } from "@/components/custom/date-picker";
import { ActionsDialog } from "@/components/custom/dialogs/actions-dialog";
import { EditorInput } from "@/components/editor/layout/editor-input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Matkul } from "@/pages/matkul/components/data/schema";
import { TaskType } from "@/types";
import { useForm } from "@inertiajs/react";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import React, { FormEventHandler } from "react";
import toast from "react-hot-toast";
import { useEditorContext } from "../../context/editor-context";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: (TaskType & { markdown?: string }) | null;
  matkuls: Matkul[] | null;
}

type TaskForm = {
  task: string;
  id_matkul: string;
  deadline: Date;
};

export const TaskActionDialog = ({
  currentRow,
  open,
  onOpenChange,
  matkuls,
}: Props) => {
  const isEdit = !!currentRow;
  const { editorSerializedState, onSerializedChange } = useEditorContext();
  const [editor] = useLexicalComposerContext();

  const { data, setData, post, processing } = useForm<
    Required<TaskForm> & { markdown?: string }
  >(
    isEdit
      ? {
          task: currentRow.task,
          id_matkul: currentRow.matkul.id_matkul,
          deadline: currentRow.deadline,
          markdown: currentRow.markdown,
        }
      : {
          task: "",
          id_matkul: "",
          deadline: new Date(),
          markdown: "",
        },
  );

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const loading = toast.loading("Menyimpan data...");

    post(
      isEdit ? route("tasks.update", currentRow.id_task) : route("tasks.store"),
      {
        onSuccess: (e) =>
          toast.success(e.props.success.message, { id: loading }),
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
          handleResetForm();
        },
        showProgress: false,
      },
    );
  };

  const ResetEditor = React.useCallback(() => {
    editor.update(() => {
      $getRoot().clear();
    });
  }, []);

  React.useEffect(() => {
    if (!isEdit) return;

    editor.update(() =>
      $convertFromMarkdownString(currentRow.markdown ?? "", TRANSFORMERS),
    );
  }, [currentRow?.markdown]);

  const handleResetForm = () => {
    ResetEditor();
    setData({
      markdown: "",
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

          <EditorInput
            state={editorSerializedState}
            setState={onSerializedChange}
            keyName="markdown"
            setData={setData}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Mata Kuliah</Label>

          <Select
            required
            value={data.id_matkul}
            defaultValue={currentRow?.matkul.id_matkul}
            onValueChange={(e) => setData("id_matkul", e)}
          >
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
          <DatePicker
            withTime
            value={new Date(data.deadline)}
            keyName="deadline"
            setValue={setData}
          />
        </div>
      </form>
    </ActionsDialog>
  );
};
