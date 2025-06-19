import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';
import toast from 'react-hot-toast';
import { InputPassword } from '@/components/ui/input-password';

type LoginForm = {
  id_number: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    id_number: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    const loading = toast.loading('Memproses...');

    post(route('login'), {
      onSuccess: () => toast.success('Berhasil masuk!', { id: loading }),
      onError: () => toast.error('Email atau kata sandi yang Anda masukkan tidak sesuai.', { id: loading }),
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthSplitLayout title="Silakan masuk ke akun Anda" description="Masukkan NIM dan kata sandi Anda di bawah ini untuk mengakses akun.">
      <Head title="Masuk" />

      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="id_number">NIM</Label>
            <Input
              id="id_number"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="id_number"
              value={data.id_number}
              onChange={(e) => setData('id_number', e.target.value)}
              placeholder="412xxxxx"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Kata Sandi</Label>
              {canResetPassword && (
                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                  Lupa Kata Sandi?
                </TextLink>
              )}
            </div>
            <InputPassword 
              id="password"
              required
              tabIndex={2}
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Password" />
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="remember"
              name="remember"
              checked={data.remember}
              onClick={() => setData('remember', !data.remember)}
              tabIndex={3}
            />
            <Label htmlFor="remember">Ingat akun saya</Label>
          </div>

          <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Masuk
          </Button>
        </div>

        {/* <div className="text-center text-sm text-muted-foreground">
										Don't have an account?{' '}
										<TextLink href={route('register')} tabIndex={5}>
												Sign up
										</TextLink>
								</div> */}
      </form>

      {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
    </AuthSplitLayout>
  );
}
