"use client";

import { DeleteDialog } from "@/components/custom/dialogs/delete-dialog";
import { Kas } from "@/types";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Kas;
}

export const KasDeleteDialog = ({
  open,
  onOpenChange,
  currentRow,
}: Props) => {
  const { delete: destroy, processing } = useForm();

  const handleDelete = () => {
    const loading = toast.loading("Memproses...");

    destroy(route("kas.destroy", currentRow.id_kas), {
      onSuccess: (e) => toast.success(e.props.success.message, { id: loading }),
      onError: (e) =>
        toast.error("Terjadi kesalahan, silahkan coba lagi!", { id: loading }),
      onFinish: () => onOpenChange(false),
    });
  };

  return (
    <DeleteDialog
      title="Kas"
      data={`pembayaran kas dari ${currentRow?.user.name}`}
      handleDelete={handleDelete}
      open={open}
      onOpenChange={onOpenChange}
      processing={processing}
    />
  );
};
