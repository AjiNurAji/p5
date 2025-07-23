import { Skeleton } from "@/components/ui/skeleton"

interface Props {
  isSingle?: boolean;
}

export const TaskSkeleton = ({ isSingle = false }: Props) => {
  
  if (isSingle) return <Skeleton className="rounded-xl w-full h-50" />;

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
      <Skeleton className="rounded-xl w-full h-50" />
      <Skeleton className="rounded-xl w-full h-50" />
      <Skeleton className="rounded-xl w-full h-50" />
    </div>
  )
}