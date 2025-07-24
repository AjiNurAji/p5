"use client";

import { DeleteDialog } from "@/components/custom/dialogs/delete-dialog";
import { Semester } from "@/types";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Semester;
}

export const SemesterDeleteDialog = ({
  open,
  onOpenChange,
  currentRow,
}: Props) => {
  const { delete: destroy, processing } = useForm();

  const handleDelete = () => {
    const loading = toast.loading("Memproses...");

    destroy(route("semester.destroy", currentRow.id_semester), {
      onSuccess: (e) => toast.success(e.props.success.message, { id: loading }),
      onError: (e) =>
        toast.error("Terjadi kesalahan, silahkan coba lagi!", { id: loading }),
      onFinish: () => onOpenChange(false),
    });
  };

  return (
    <DeleteDialog
      title="matkul"
      data={`semester ${currentRow.semester}`}
      handleDelete={handleDelete}
      open={open}
      onOpenChange={onOpenChange}
      processing={processing}
    />
  );
};
