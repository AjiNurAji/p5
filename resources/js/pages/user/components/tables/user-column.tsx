import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { LongText } from '@/components/long-text'
import { userTypes } from '../data/data'
import { User } from '../data/schema'
import { TableColumnHeader } from './table-column-header'
import { DataTableRowActions } from './table-row-actions'

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id_number',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='NIM' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('id_number')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
    sortDescFirst: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Nama Lengkap' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('name')}</div>
    ),
    enableHiding: false,
    enableSorting: false
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Alamat Email' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('email') || '-'}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'email_verified_at',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Diverifikasi pada' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue<Date>('email_verified_at')?.toLocaleString() || '-'}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Peran' />
    ),
    cell: ({ row }) => {
      const { role } = row.original
      const userType = userTypes.find(({ value }) => value === role)

      if (!userType) {
        return null
      }

      return (
        <div className='flex items-center gap-x-2'>
          {userType.icon && (
            <userType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm capitalize'>{row.getValue('role')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Dibuat pada' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue<Date>('created_at').toLocaleString()}</div>
    ),
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Terakhir diubah' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue<Date>('updated_at').toLocaleString()}</div>
    ),
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },

]
