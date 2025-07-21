import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import HeadingSmall from "@/components/heading-small";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { InputPassword } from "./ui/input-password";

export default function DeleteUser() {
  const passwordInput = useRef<any>(null);
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm<Required<{ password: string }>>({ password: "" });

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();
    const loading = toast.loading("Menghapus data...");

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: (e) => {
        toast.success(e.props.success.message, { id: loading });
        closeModal();
      },
      onError: (e) => {
        if (e?.role) {
          toast.error(e?.role, { id: loading });
        } else if (e?.password) {
          toast.error(e?.password, { id: loading });
        } else if (e?.message) {
          toast.error(e?.message, { id: loading });
        }
      },
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    clearErrors();
    reset();
  };

  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Hapus Akun"
        description="Hapus akun Anda beserta seluruh data dan sumber dayanya."
      />
      <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
          <p className="font-medium">Peringatan</p>
          <p className="text-sm">
            Mohon berhati-hati, tindakan ini bersifat permanen dan tidak dapat
            diurungkan.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Hapus Akun</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Apakah Anda yakin ingin menghapus akun Anda?
            </DialogTitle>
            <DialogDescription>
              Setelah akun Anda dihapus, seluruh data dan sumber daya yang
              terkait akan dihapus secara permanen. Silakan masukkan kata sandi
              Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun ini
              secara permanen.
            </DialogDescription>
            <form className="space-y-6" onSubmit={deleteUser}>
              <div className="grid gap-2">
                <Label htmlFor="password" className="sr-only">
                  Kata Sandi
                </Label>

                <InputPassword
                  id="password"
                  name="password"
                  ref={passwordInput}
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  placeholder="Kata sandi"
                  autoComplete="current-password"
                />

                <InputError message={errors.password} />
              </div>

              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="secondary" onClick={closeModal}>
                    Batal
                  </Button>
                </DialogClose>

                <Button variant="destructive" disabled={processing} asChild>
                  <button type="submit">Hapus Akun</button>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
