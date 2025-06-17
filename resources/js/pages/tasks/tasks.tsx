import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tugas',
    href: route('tasks.index'),
  },
];

const TaskPage = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <h1>TASK PAGE</h1>
    </AppLayout>
  )
}

export default TaskPage;