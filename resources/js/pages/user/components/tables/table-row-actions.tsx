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
import { useUsers } from '../../context/users-context'
import { User } from '../data/schema'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { usePage } from '@inertiajs/react'
import { SharedData } from '@/types'

interface DataTableRowActionsProps {
  row: Row<User>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useUsers();
  const { auth: {user: { id_number, role }} } = usePage<SharedData>().props

  return (
    row.original.id_number === id_number || role !== 'superadmin' && row.original.role === 'superadmin' || row.original.id_number === Number(import.meta.env.VITE_AUTHOR_ID) ? "" :
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
