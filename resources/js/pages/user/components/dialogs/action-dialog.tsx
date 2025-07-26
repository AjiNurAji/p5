"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAccess } from "@/layouts/authorized-layout";
import { SharedData, User } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Loader } from "lucide-react";
import { FormEventHandler } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: User;
}

type UserForm = {
  id_number: string;
  password: string;
  name: string;
  role: string;
  email: string;
};

export const ActionDialog = ({ currentRow, open, onOpenChange }: Props) => {
  const isEdit = !!currentRow;
  const {
    auth: { user },
  } = usePage<SharedData>().props;

  const { data, setData, post, processing } = useForm<Required<UserForm>>(
    isEdit
      ? {
          id_number: currentRow.id_number,
          name: currentRow.name,
          email: currentRow.email,
          role: currentRow.role,
          password: "",
        }
      : {
          id_number: "",
          name: "",
          email: "",
          password: "",
          role: "",
        },
  );

  const roles = [
    { value: "superadmin", label: "Super Admin", access: ["superadmin"] },
    { value: "kosma", label: "Kosma", access: ["superadmin"] },
    { value: "wakosma", label: "Wakil Kosma", access: ["superadmin"] },
    {
      value: "sekertaris",
      label: "Sekertaris",
      access: ["superadmin", "kosma", "wakosma "],
    },
    {
      value: "bendahara",
      label: "Bendahara",
      access: ["superadmin", "kosma", "wakosma "],
    },
    {
      value: "member",
      label: "Anggota",
      access: ["superadmin", "kosma", "wakosma"],
    },
  ];

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const loading = toast.loading("Menyimpan data...");

    post(
      isEdit
        ? route("user.update", currentRow.id_number as string)
        : route("register"),
      {
        onSuccess: (e) => {
          handleResetForm();
          toast.success(e.props.success.message, { id: loading });
        },
        onError: (e) => {
          if (e?.id_number) {
            return toast.error(e?.id_number, { id: loading });
          } else if (e?.name) {
            return toast.error(e?.name, { id: loading });
          } else if (e?.email) {
            return toast.error(e?.email, { id: loading });
          } else if (e?.password) {
            return toast.error(e?.password, { id: loading });
          } else if (e?.role) {
            return toast.error(e?.role, { id: loading });
          }

          return toast.error("Terjadi kesalahan, silahkan coba lagi!", {
            id: loading,
          });
        },
        onFinish: () => {
          setData({
            ...data,
            password: "",
          });
          onOpenChange(false);
        },
      },
    );
  };

  const handleResetForm = () => {
    setData({
      id_number: "",
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

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
          <DialogTitle>
            {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit informasi mahasiswa melalui formulir di bawah ini. "
              : "Isi data di bawah untuk menambahkan mahasiswa baru. "}
            Tekan <b>Simpan</b> untuk menyimpan perubahan.
          </DialogDescription>
        </DialogHeader>
        <div className="-mr-4 w-full overflow-y-auto py-1">
          <form
            id="user-form"
            onSubmit={handleSubmit}
            className="space-y-4 p-0.5"
          >
            <div className="grid gap-2">
              <Label htmlFor="id_number">NIM</Label>

              <Input
                id="id_number"
                type="text"
                name="id_number"
                value={data.id_number}
                onChange={(e) => setData("id_number", e.target.value)}
                placeholder="4124xxxx"
                autoComplete="nim"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>

              <Input
                id="name"
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                placeholder="Jhon doe"
                autoComplete="name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Alamat Email (opsional)</Label>

              <Input
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="pioneers@example.com"
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Peran</Label>

              <Select
                value={data.role}
                defaultValue={data.role}
                onValueChange={(e) => setData("role", e)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih peran untuk mahasiswa" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) =>
                    r.access ? (
                      getAccess(user.role, r.access) && (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      )
                    ) : (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Kata Sandi</Label>

              <InputPassword
                id="password"
                name="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                placeholder="Kata sandi"
                autoComplete="current-password"
              />
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button type="submit" form="user-form" disabled={processing}>
            {processing && <Loader className="h-4 w-4 animate-spin" />}
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
