import { DollarSign } from "lucide-react"
import { useKas } from "../context/kas-context"
import { Button } from "@/components/ui/button";

export const KasButton = () => {
  const { setOpen } = useKas();

  return (
    <div className='flex'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Tambah Transaksi</span> <DollarSign className='size-5' />
      </Button>
    </div>
  )
}