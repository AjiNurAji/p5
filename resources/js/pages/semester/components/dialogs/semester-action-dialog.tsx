"use client";

import { ActionsDialog } from "@/components/custom/dialogs/actions-dialog";
import InputError from "@/components/input-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SemestersForm = {
  semester: number | null;
  is_active: boolean;
};

export const SemesterActionDialog = ({
  open,
  onOpenChange,
}: Props) => {
  const [error, setError] = useState<boolean>(false);

  const { setData, post, processing } = useForm<Required<SemestersForm>>({
    semester: null,
    is_active: false,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const loading = toast.loading("Menyimpan data...");

    post(route("semester.store"),
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
          } else if (e?.is_active) {
            return toast.error(e?.is_active, { id: loading });
          } else if (e?.semester) {
            return toast.error(e?.semester, { id: loading });
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
      is_active: false,
      semester: null,
    });
  };

  return (
    <ActionsDialog
      formName="semester-form"
      processing={processing}
      handleResetForm={handleResetForm}
      open={open}
      onOpenChange={onOpenChange}
      title="Mata Kuliah"
    >
      <form
        id="semester-form"
        onSubmit={handleSubmit}
        className="space-y-4 p-0.5"
      >
        <div className="grid gap-2">
          <Label htmlFor="semester">Semester</Label>

          <Input
            id="semester"
            type="text"
            name="semester"
            onChange={(e) => {
              const regEx = /^\d+$/;
              if (!regEx.test(e.target.value)) {
                setError(true);
              } else {
                setError(false);
              }
              setData("semester", Number(e.target.value));
            }}
            placeholder="Masukan semester aktif"
          />

          <InputError message={error ? "Hanya dapat memasukkan angka" : ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>

          <Select
            onValueChange={(e) => {
              setData("is_active", e === "true" ? true : false);
            }}
          >
            <SelectTrigger>
              <SelectValue id="status" placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Aktif</SelectItem>
              <SelectItem value="false">Tidak Aktif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </ActionsDialog>
  );
};
