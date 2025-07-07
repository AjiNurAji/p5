'use client';

import { ActionsDialog } from "@/components/custom/dialogs/actions-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Matkul } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: Matkul;
}

type MatkulsForm = Matkul;

export const MatkulsActionDialog = ({ currentRow, open, onOpenChange }: Props) => {
  const isEdit = !!currentRow;

  const { data, setData, post, processing } = useForm<Required<MatkulsForm>>(isEdit ? {
    id_matkul: currentRow.id_matkul,
    name: currentRow.name,
    lecturer: currentRow.lecturer,
    semester: currentRow.semester,
  } : {
    id_matkul: "",
    name: "",
    lecturer: "",
    semester: 0,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    const loading = toast.loading('Menyimpan data...');

    post(isEdit ? route('matkul.update', currentRow.id_matkul) : route('matkul.store'), {
      onSuccess: (e) => {
        toast.success(e.props.success.message, { id: loading })
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
        } else if (e?.semester) {
          return toast.error(e?.semester, { id: loading });
        }

        return toast.error('Terjadi kesalahan, silahkan coba lagi!', { id: loading });
      },
      onFinish: () => onOpenChange(false),
    });
  }

  const handleResetForm = () => {
    setData({
      id_matkul: "",
      name: "",
      lecturer: "",
      semester: 0,
    })
  }

  return (
    <ActionsDialog formName="matkuls-form" processing={processing} handleResetForm={handleResetForm} open={open} onOpenChange={onOpenChange} title="Mata Kuliah">
      <form id="matkuls-form" onSubmit={handleSubmit} className="space-y-4 p-0.5">
        <div className="grid gap-2">
          <Label htmlFor="name">
            Mata Kuliah
          </Label>

          <Input
            id="name"
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="cth. Kalkulus"
            autoComplete="name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lecturer">
            Dosen Pengampu
          </Label>

          <Input
            id="lecturer"
            type="text"
            name="lecturer"
            value={data.lecturer}
            onChange={(e) => setData('lecturer', e.target.value)}
            placeholder="cth. Budi Susanto S.Kom"
            autoComplete="lecturer"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="semester">
            Semester
          </Label>

          <Input
            id="semester"
            type="number"
            name="semester"
            value={data.semester}
            onChange={(e) => setData('semester', Number(e.target.value))}
            placeholder="3"
            min={1}
            max={8}
            autoComplete="semester"
          />
        </div>
      </form>
    </ActionsDialog>
  )
}