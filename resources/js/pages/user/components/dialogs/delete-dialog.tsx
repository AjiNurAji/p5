'use client';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: User;
}

export const DeleteDialog = ({ open, onOpenChange, currentRow }: Props) => {
  const [value, setValue] = useState<string>('');
  const { delete: destroy, processing } = useForm();

  const handleDelete = () => {
    const loading = toast.loading('Memproses...');
    if (value.trim() !== currentRow.name) return toast.error('Nama tidak sesuai.', { id: loading });
    // TODO: delete user

    destroy(route('user.delete', currentRow.id_number as string), {
      onSuccess: (e) => toast.success(e.props.success.message, { id: loading }),
      onError: (e) => toast.error(e.role, { id: loading }),
      onFinish: () => setValue(""),
      showProgress: false,
    });
    onOpenChange(false);
  };

  return (
    <ConfirmDialog
      open={open}
      handleConfirm={handleDelete}
      onOpenChange={onOpenChange}
      disabled={value.trim() !== currentRow.name || processing}
      title={
        <span className="text-red-500 flex justify-start items-center">
          <AlertTriangle className="inline-block mr-1 size-5 stroke-redtext-red-500" /> Hapus Mahasiswa
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Apakah Anda yakin ingin menghapus <span className="font-bold">{currentRow.name}</span>?
            <br />
            Tindakan ini akan secara permanen menghapus mahasiswa dengan peran{' '}
            <span className="font-bold">{currentRow.role.toLocaleUpperCase()}</span> dari sistem. Tindakan ini tidak dapat dibatalkan.
          </p>

          <Label className="my-2 inline-block w-full space-y-2">
            <span className="inline-block">Nama Lengkap:</span>
            <Input value={value} className='w-full' onChange={(e) => setValue(e.target.value)} placeholder="Masukkan nama lengkap untuk konfirmasi." />
          </Label>

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
