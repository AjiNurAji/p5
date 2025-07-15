'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Matkul, TaskType } from '@/types';
import { Loader } from 'lucide-react';
import React from 'react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: Matkul | TaskType | null;
  formName: string;
  handleResetForm: () => void;
  processing: boolean;
  children: React.ReactNode;
  title: string;
}

export const ActionsDialog = ({ handleResetForm, processing, children, currentRow, formName, title, open, onOpenChange }: Props) => {
  const isEdit = !!currentRow;

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        handleResetForm();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="capitalize">{isEdit ? `Edit ${title}` : `Tambah ${title} Baru`}</DialogTitle>
          <DialogDescription>
              {isEdit
                ? <span>Edit informasi <span className="lowercase">{title}</span> melalui formulir di bawah ini.</span>
                : <span>Isi data di bawah untuk menambahkan <span className="lowercase">{title}</span> baru.</span>
              }{" "}
              Tekan <b>Simpan</b> untuk menyimpan perubahan.
          </DialogDescription>
        </DialogHeader>
        <div className="-mr-4 w-full overflow-y-auto py-1">{children}</div>
        <DialogFooter>
          <Button type="submit" form={formName} disabled={processing}>
            {processing && <Loader className="h-4 w-4 animate-spin" />}
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
