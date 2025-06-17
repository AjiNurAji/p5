import { Forbidden } from "@/components/errors/forbidden";
import Heading from "@/components/heading";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import UsersProvider from "./context/users-context";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Pengguna',
    href: route('users.index'),
  },
];

const UsersPage = () => {
  const { auth: { user } } = usePage<SharedData>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <UsersProvider>
        {user.role === 'member' ?
          <Forbidden />
          :
          (
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
              <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                <Heading title="Daftar Pengguna" description="Atur pengguna dan hak akses mereka dengan mudah di halaman ini." />
                <UsersPrimaryButtons />
              </div>
              <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                {/* <UsersTable data={userList} columns={columns} /> */}
              </div>
            </div>
          )}
      </UsersProvider>
    </AppLayout>
  )
}

export default UsersPage;