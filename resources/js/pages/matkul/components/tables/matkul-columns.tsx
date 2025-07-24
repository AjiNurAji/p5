import { ColumnDef } from "@tanstack/react-table";
import { Matkul } from "../data/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { TableColumnHeader } from "@/components/custom/table-column-header";
import { LongText } from "@/components/long-text";
import { TableRowActions } from "@/components/custom/table-row-actions";
import { useMatkuls } from "../../context/matkuls-context";

export const columns: ColumnDef<Matkul>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Mata Kuliah' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 capitalize'>{row.getValue('name')}</LongText>
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
    accessorKey: 'lecturer',
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Dosen Pengampu' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap capitalize'>{row.getValue('lecturer')}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorFn: (row) => row.semester.semester,
    id: "semester",
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Semester' />
    ),
    cell: ({ getValue }) => (
      <div className='w-fit text-nowrap'>{getValue() as string}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
      id: 'actions',
      cell: ({row}) => {
        const { setCurrentRow, setOpen } = useMatkuls();
        return <TableRowActions row={row} setOpen={setOpen} setCurrentRow={setCurrentRow} />
      },
    },
]