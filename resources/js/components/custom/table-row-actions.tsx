import { Row } from '@tanstack/react-table'
import { Edit3, Trash2, Ellipsis } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface DataTableRowActionsProps {
  row: any;
  setCurrentRow: (c: any) => void;
  setOpen: (open: any) => void;
}

export function TableRowActions({ row, setCurrentRow, setOpen }: DataTableRowActionsProps) {
  return (
    <DropdownMenu modal={false}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
            >
              <Ellipsis className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p className='capitalize'>opsi lainnya</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original as any)
            setOpen('edit')
          }}
          className='cursor-pointer'
        >
          Ubah
          <DropdownMenuShortcut>
            <Edit3 size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original as any)
            setOpen('delete')
          }}
          className='text-red-500! cursor-pointer'
        >
          Hapus
          <DropdownMenuShortcut>
            <Trash2 size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
