import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu' 
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Settings2 } from 'lucide-react'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export const ViewOptions = <TData,>({
  table,
}: DataTableViewOptionsProps<TData>) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto hidden h-8 lg:flex'
        >
          <Settings2 className='mr-2 h-4 w-4' />
          Atur Kolom
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-auto'>
        <DropdownMenuLabel>Tampilkan/Sembunyikan Kolom</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id === 'email' ? 'Alamat Email' : column.id === 'created_at' ? 'dibuat pada' : column.id === 'updated_at' ? 'diubah pada': column.id === 'email_verified_at' ? 'diverifikasi pada': column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
