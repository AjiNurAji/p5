import { Button } from "@/components/ui/button"
import { ListPlus } from "lucide-react"
import { useTasks } from "../context/tasks-context"

export const TaskButton = () => {
  const { setOpen } = useTasks();
  return (
    <div className="flex">
      <Button className='space-x-1' onClick={() => setOpen("add")}>
        <span>Tambah Tugas</span> <ListPlus className='size-5' />
      </Button>
    </div>
  )
}