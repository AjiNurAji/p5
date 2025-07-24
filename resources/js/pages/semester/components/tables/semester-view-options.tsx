import { TableViewOptions } from "@/components/custom/table-view-options"
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Table } from "@tanstack/react-table"

interface Props<TData> {
  table: Table<TData>;
}

export const SemesterViewOptions = <TData,>({ table }: Props<TData>) => {
  return (
    <TableViewOptions>
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
              {column.id}
            </DropdownMenuCheckboxItem>
          )
        })}
    </TableViewOptions>
  )
}