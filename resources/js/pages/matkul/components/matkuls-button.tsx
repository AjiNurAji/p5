import { Button } from "@/components/ui/button"
import { useMatkuls } from "../context/matkuls-context"
import { BookPlus } from "lucide-react"

export const MatkulsButton = () => {
  const { setOpen } = useMatkuls()
  return (
    <div className='flex'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Tambah Matkul</span> <BookPlus className='size-5' />
      </Button>
    </div>
  )
}