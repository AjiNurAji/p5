// Components
import { Head, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler } from "react";

import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm<
    Required<{ email: string }>
  >({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <AuthLayout
      title="Lupa Kata Sandi"
      description="Masukkan email untuk menerima tautan reset kata sandi atau minta admin menggatinya."
    >
      <Head title="Lupa Kata Sandi" />

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}

      <div className="space-y-6">
        <form onSubmit={submit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Alamat Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="off"
              value={data.email}
              autoFocus
              onChange={(e) => setData("email", e.target.value)}
              placeholder="email@example.com"
            />

            <InputError message={errors.email} />
          </div>

          <div className="my-6 flex items-center justify-start">
            <Button className="w-full" disabled={processing}>
              {processing && <Loader2 className="h-4 w-4 animate-spin" />}
              Kirim tautan reset kata sandi
            </Button>
          </div>
        </form>

        <div className="space-x-1 text-center text-sm text-muted-foreground">
          <span>Atau, kembali ke</span>
          <TextLink href={route("login")}>Masuk</TextLink>
        </div>
      </div>
    </AuthLayout>
  );
}
