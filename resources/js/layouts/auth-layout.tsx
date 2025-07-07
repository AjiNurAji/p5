import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
  return (
    <AuthLayoutTemplate title={title} description={description} {...props}>
      <Toaster position="top-center" toastOptions={
        {
          loading: {
            icon: <Loader className="size-4 animate-spin" />
          }
        }
      } />
      {children}
    </AuthLayoutTemplate>
  );
}
