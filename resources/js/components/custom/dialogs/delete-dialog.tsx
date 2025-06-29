'use client';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleDelete: () => void;
  processing: boolean;
  data: string;
}

export const DeleteDialog = ({ open, onOpenChange, handleDelete, processing, data }: Props) => {

  return (
    <ConfirmDialog
      open={open}
      handleConfirm={handleDelete}
      onOpenChange={onOpenChange}
      disabled={processing}
      title={
        <span className="text-red-500 flex justify-start items-center">
          <AlertTriangle className="inline-block mr-1 size-5 stroke-redtext-red-500" /> Hapus Pengguna
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Apakah Anda yakin ingin menghapus data <span className="font-bold capitalize">{data}</span>?
            <br />
            Tindakan ini akan secara permanen menghapus data{' '}
            <span className="font-bold">{data.toLocaleUpperCase()}</span> dari sistem. Tindakan ini tidak dapat dibatalkan.
          </p>

          <Alert variant="destructive">
            <AlertTitle>Peringatan!</AlertTitle>
            <AlertDescription>Mohon berhati-hati, tindakan ini bersifat permanen dan tidak dapat dibatalkan.</AlertDescription>
          </Alert>
        </div>
      }
      confirmBtnText="Hapus"
      destructive
    />
  );
};
