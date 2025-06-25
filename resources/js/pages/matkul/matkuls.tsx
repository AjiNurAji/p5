import { ErrorPage } from "@/components/errors/error-page";
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem, SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'mata kuliah',
    href: route('matkul.index'),
  },
];

const Matkuls = () => {
  const { auth: { user } } = usePage<SharedData>().props;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mata Kuliah" />
      {user.role === 'member' ?
        <ErrorPage code={403} error="Akses Dibatasi!" message="Upss! Anda tidak memiliki izin <br />
          untuk melihat halaman ini." />
        :
        <h1>MENDAPATKAN AKSES</h1>
      }
    </AppLayout>
  )
}

export default Matkuls;