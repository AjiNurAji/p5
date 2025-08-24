import InputError from "@/components/input-error";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import { type BreadcrumbItem } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

import HeadingSmall from "@/components/heading-small";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Pengelolaan Kata Sandi",
    href: "/settings/password",
  },
];

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset("current_password");
          currentPasswordInput.current?.focus();
        }
      },
      showProgress: false,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pengaturan Kata Sandi" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="Perbarui Kata Sandi"
            description="Pastikan akun Anda menggunakan kata sandi yang kuat, panjang, dan acak untuk menjaga keamanan."
          />

          <form onSubmit={updatePassword} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="current_password">Kata Sandi Saat Ini</Label>

              <InputPassword
                id="current_password"
                ref={currentPasswordInput}
                value={data.current_password}
                onChange={(e) => setData("current_password", e.target.value)}
                className="mt-1 block w-full"
                required
                autoComplete="current-password"
                placeholder="Kata sandi saat ini"
              />

              <InputError message={errors.current_password} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Kata Sandi Baru</Label>

              <InputPassword
                ref={passwordInput}
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                required
                className="mt-1 block w-full"
                autoComplete="new-password"
                placeholder="Kata sandi baru"
              />

              <InputError message={errors.password} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">
                Konfirmasi Kata Sandi
              </Label>

              <InputPassword
                id="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
                required
                className="mt-1 block w-full"
                autoComplete="new-password"
                placeholder="Konfirmasi kata sandi"
              />

              <InputError message={errors.password_confirmation} />
            </div>

            <div className="flex items-center gap-4">
              <Button disabled={processing}>
                {processing && <Loader className="h-4 w-4 animate-spin" />}
                Simpan Kata Sandi
              </Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-neutral-600">Tersimpan</p>
              </Transition>
            </div>
          </form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
