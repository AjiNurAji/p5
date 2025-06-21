import { Forbidden } from "@/components/errors/forbidden";
import AppLayout from "@/layouts/app-layout"
import { SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";

const Matkuls = () => {
  const { auth: { user } } = usePage<SharedData>().props;
  return (
    <AppLayout>
      <Head title="Mata Kuliah" />
        {user.role === 'member' ?
          <Forbidden />
          :
          <h1>MENDAPATKAN AKSES</h1>
        }
    </AppLayout>
  )
}

export default Matkuls;