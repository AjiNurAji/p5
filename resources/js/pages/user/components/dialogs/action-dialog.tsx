'use client';

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SharedData, User } from "@/types";
import { usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: User;
}

type UserForm = {
  id_number: string;
  password: string;
  name: string;
  role: 'superadmin' | 'admin' | 'member';
  email?: string;
}


export const ActionDIalog = ({ currentRow, open, onOpenChange }: Props) => {
  const isEdit = !!currentRow;
  const { auth: { user: { role } } } = usePage<SharedData>().props;

  const roles = [
    { value: 'superadmin', label: 'Super Admin', access: ['superadmin'] },
    { value: 'admin', label: 'Admin', access: ['superadmin', 'admin'] },
    { value: 'member', label: 'Member', access: ['superadmin', 'admin'] },
  ]

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
  }

  const handleResetForm = () => {
    return;
  }

  return (
    <Dialog open={open} onOpenChange={(state) => {
      handleResetForm()
      onOpenChange(state);
    }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Edit informasi pengguna melalui formulir di bawah ini. ' : 'Isi data di bawah untuk menambahkan pengguna baru. '}
            Tekan Simpan untuk menyimpan perubahan.
          </DialogDescription>
        </DialogHeader>
        <div className="-mr-4 w-full overflow-y-auto py-1 pr-4">
          <form id="user-form" onSubmit={handleSubmit} className="space-y-4 p-0.5">
            <div className="grid gap-2">
              <Label htmlFor="id_number">
                NIM
              </Label>

              <Input
                id="id_number"
                type="text"
                name="id_number"
                // value={data.password}
                // onChange={(e) => setData('password', e.target.value)}
                placeholder="4124xxxx"
                autoComplete="nim"
              />

              {/* <InputError message={errors.password} /> */}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nama Lengkap
              </Label>

              <Input
                id="name"
                type="text"
                name="name"
                // value={data.password}
                // onChange={(e) => setData('password', e.target.value)}
                placeholder="Jhon doe"
                autoComplete="name"
              />

              {/* <InputError message={errors.password} /> */}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">
                Alamat Email (opsional)
              </Label>

              <Input
                id="email"
                type="email"
                name="email"
                // value={data.password}
                // onChange={(e) => setData('password', e.target.value)}
                placeholder="pioneers@example.com"
                autoComplete="email"
              />

              {/* <InputError message={errors.password} /> */}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">
                Role
              </Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih role untuk pengguna" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    r.access ?
                      r.access.map((a) => (
                        a === role && (
                          <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                        )
                      )) : (
                        <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                      )
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">
                Kata Sandi
              </Label>

              <InputPassword
                id="password"
                name="password"
                // value={data.password}
                // onChange={(e) => setData('password', e.target.value)}
                placeholder="Kata sandi"
                autoComplete="current-password"
              />

              {/* <InputError message={errors.password} /> */}
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form'>
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}