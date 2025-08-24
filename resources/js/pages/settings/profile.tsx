import { type BreadcrumbItem, type SharedData } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

import DeleteUser from "@/components/delete-user";
import HeadingSmall from "@/components/heading-small";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInitials } from "@/hooks/use-initials";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import { Loader } from "lucide-react";
import { AvatarUpload } from "./components/avatar-upload";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Pengelolaan Profil",
    href: "/settings/profile",
  },
];

type ProfileForm = {
  name: string;
  email: string;
};

export default function Profile({
  mustVerifyEmail,
  status,
}: {
  mustVerifyEmail: boolean;
  status?: string;
}) {
  const { auth } = usePage<SharedData>().props;

  const getInitials = useInitials();

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm<Required<ProfileForm>>({
      name: auth.user.name,
      email: auth.user.email,
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("profile.update"), {
      preserveScroll: true,
      showProgress: false,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pengelolaan Profil" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="Informasi Profil"
            description="Perbarui nama dan alamat email Anda di sini."
          />

          <form onSubmit={submit} className="space-y-6">
            <AvatarUpload />

            <div className="grid gap-2">
              <Label htmlFor="id_number">NIM</Label>

              <Input
                id="id_number"
                className="mt-1 block w-full"
                value={auth.user.id_number}
                disabled
                placeholder="id_number"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Peran</Label>

              <Input
                id="role"
                className="mt-1 block w-full capitalize"
                value={auth.user.role}
                disabled
                placeholder="role"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>

              <Input
                id="name"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
                autoComplete="name"
                placeholder="Nama lengkap"
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">
                Alamat Email (Opsional){" "}
                <span className="font-normal text-muted-foreground">
                  (
                  {!auth.user.email
                    ? "Tidak ada email"
                    : !mustVerifyEmail && auth.user.email_verified_at === null
                      ? "Belum terverifikasi"
                      : "Terverifikasi"}
                  )
                </span>
              </Label>

              <Input
                id="email"
                type="email"
                className="mt-1 block w-full"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                autoComplete="email"
                placeholder="Alamat email"
              />

              <InputError className="mt-2" message={errors.email} />
              {!mustVerifyEmail &&
                auth.user.email &&
                auth.user.email_verified_at === null && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Alamat email Anda belum terverifikasi.{" "}
                      <Link
                        href={route("verification.send")}
                        method="post"
                        as="button"
                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                      >
                        Klik di sini untuk mengirim ulang email verifikasi.
                      </Link>
                    </p>

                    {status === "verification-link-sent" && (
                      <div className="mt-2 text-sm font-medium text-green-600">
                        Tautan verifikasi baru telah dikirim ke alamat email
                        Anda.
                      </div>
                    )}
                  </div>
                )}
            </div>

            <div className="flex items-center gap-4">
              <Button disabled={processing}>
                {processing && <Loader className="h-4 w-4 animate-spin" />}
                Simpan
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

        <DeleteUser />
      </SettingsLayout>
    </AppLayout>
  );
}
