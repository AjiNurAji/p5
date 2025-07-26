"use client";

import { ActionsDialog } from "@/components/custom/dialogs/actions-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Matkul, Semester } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: Matkul;
}

type MatkulsForm = {
  id_matkul: string;
  name: string;
  id_semester: string;
  lecturer: string;
};

export const MatkulsActionDialog = ({
  currentRow,
  open,
  onOpenChange,
}: Props) => {
  const isEdit = !!currentRow;
  const { semester } = usePage<{ semester: Semester }>().props;

  const { data, setData, post, processing } = useForm<Required<MatkulsForm>>(
    isEdit
      ? {
          id_matkul: currentRow.id_matkul,
          name: currentRow.name,
          lecturer: currentRow.lecturer,
          id_semester: currentRow.id_semester,
        }
      : {
          id_matkul: "",
          name: "",
          lecturer: "",
          id_semester: semester.id_semester,
        },
  );

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const loading = toast.loading("Menyimpan data...");

    post(
      isEdit
        ? route("matkul.update", currentRow.id_matkul)
        : route("matkul.store"),
      {
        onSuccess: (e) => {
          toast.success(e.props.success.message, { id: loading });
          handleResetForm();
        },
        onError: (e) => {
          if (e?.message) {
            return toast.error(e.message, { id: loading });
          } else if (e?.role) {
            return toast.error(e?.role, { id: loading });
          } else if (e?.id_matkuls) {
            return toast.error(e?.id_matkul, { id: loading });
          } else if (e?.name) {
            return toast.error(e?.name, { id: loading });
          } else if (e?.lecturer) {
            return toast.error(e?.lecturer, { id: loading });
          } else if (e?.id_semester) {
            return toast.error(e?.id_semester, { id: loading });
          }

          return toast.error("Terjadi kesalahan, silahkan coba lagi!", {
            id: loading,
          });
        },
        onFinish: () => onOpenChange(false),
      },
    );
  };

  const handleResetForm = () => {
    setData({
      id_matkul: "",
      name: "",
      lecturer: "",
      id_semester: semester.id_semester,
    });
  };

  return (
    <ActionsDialog
      formName="matkuls-form"
      processing={processing}
      handleResetForm={handleResetForm}
      open={open}
      onOpenChange={onOpenChange}
      title="Mata Kuliah"
    >
      <form
        id="matkuls-form"
        onSubmit={handleSubmit}
        className="space-y-4 p-0.5"
      >
        <div className="grid gap-2">
          <Label htmlFor="name">Mata Kuliah</Label>

          <Input
            id="name"
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            placeholder="cth. Kalkulus"
            autoComplete="name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lecturer">Dosen Pengampu</Label>

          <Input
            id="lecturer"
            type="text"
            name="lecturer"
            value={data.lecturer}
            onChange={(e) => setData("lecturer", e.target.value)}
            placeholder="cth. Budi Susanto S.Kom"
            autoComplete="lecturer"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="semester">Semester</Label>

          <div className="pointer-events-none flex h-9 w-full min-w-0 items-center rounded-md border border-input bg-transparent px-3 py-1 text-base opacity-50 shadow-xs hover:cursor-not-allowed md:text-sm dark:bg-input/30">
            {semester.semester}
          </div>
        </div>
      </form>
    </ActionsDialog>
  );
};
