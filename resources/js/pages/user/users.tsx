import { ErrorPage } from "@/components/errors/error-page";
import Heading from "@/components/heading";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import UsersProvider from "./context/users-context";
import { UserDialogs } from "./components/users-dialogs";
import { UsersTable } from "./components/tables/user-table";
import { columns } from "./components/tables/user-column";
import { userListSchema } from "./components/data/schema";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Pengguna',
    href: route('users.index'),
  },
];

const UsersPage = () => {
  const { users, auth: { user } } = usePage<SharedData>().props;

  const userList = userListSchema.parse(users);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pengguna" />
      <UsersProvider>
        {user.role === 'member' ?
          <ErrorPage code={403} error="Akses Dibatasi!" message="Upss! Anda tidak memiliki izin <br />
                    untuk melihat halaman ini." />
          :
          (
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
              <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                <Heading title="Daftar Pengguna" description="Atur pengguna dan hak akses mereka dengan mudah di halaman ini." />
                <UsersPrimaryButtons />
              </div>
              <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                <UsersTable data={userList} columns={columns} />
              </div>
            </div>
          )}

        <UserDialogs />
      </UsersProvider>
    </AppLayout>
  )
}

export default UsersPage;