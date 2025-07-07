import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { userTypes } from '../data/data'
import { FacetedFilter } from './facated-filter'
import { ViewOptions } from './view-options'
import { X } from 'lucide-react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export const TableToolbar = <TData,>({
  table,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-end sm:items-center justify-between flex-wrap'>
      <div className='flex flex-1 sm:flex-row flex-col items-start gap-y-2 sm:items-center space-x-2'>
        <Input
          placeholder='Cari pengguna...'
          value={
            (table.getColumn('name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-full lg:w-[250px]'
        />
        <div className='flex gap-x-2 w-full'>
          {table.getColumn('role') && (
            <FacetedFilter
              column={table.getColumn('role')}
              title='Peran'
              options={userTypes.map((t) => ({ ...t }))}
            />
          )}
          <ViewOptions className='sm:hidden flex' table={table} />
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <X className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <ViewOptions table={table} />
    </div>
  )
}
