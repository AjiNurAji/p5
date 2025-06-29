'use client';

import { DeleteDialog } from '@/components/custom/dialogs/delete-dialog';
import { Matkul } from '@/types';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Matkul;
}

export const MatkulDeleteDialog = ({ open, onOpenChange, currentRow }: Props) => {
  const { delete: destroy, processing } = useForm();

  const handleDelete = () => {
    const loading = toast.loading('Memproses...');

    destroy(route('matkuls.delete', currentRow.id_matkuls), {
      onSuccess: (e) => toast.success(e.props.success.message, { id: loading }),
      onError: (e) => toast.error('Terjadi kesalahan, silahkan coba lagi!', { id: loading }),
      onFinish: () => onOpenChange(false),
    });
  };

  return (
    <DeleteDialog data={currentRow.name} handleDelete={handleDelete} open={open} onOpenChange={onOpenChange} processing={processing} />
  );
};
