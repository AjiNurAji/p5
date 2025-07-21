import { TableColumnHeader } from "@/components/custom/table-column-header";
import { TableRowActions } from "@/components/custom/table-row-actions";
import { LongText } from "@/components/long-text";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useKas } from "../../context/kas-context";
import { Kas } from "../../data/schema";
import { formatDate } from "@/components/custom/date-picker";
import useCurrency from "@/hooks/use-currency";

export const columns: ColumnDef<Kas>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    meta: {
      className: cn(
        "sticky left-0 z-10 rounded-tl md:table-cell",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorFn: (row) => row.user.name,
    id: "user",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Nama Mahasiswa" />
    ),
    cell: ({ getValue }) => (<LongText className="max-w-36 capitalize">{getValue() as string}</LongText>),
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] lg:drop-shadow-none dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell",
      ),
    },
    enableHiding: false,
    sortDescFirst: false,
    filterFn: "includesString"
  },
  {
    accessorKey: "method",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Metode" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap capitalize">{row.getValue("method") == "cash" ? "Tunai" : "Transfer"}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "nominal",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Nominal" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{useCurrency(row.getValue("nominal"))}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "payment_on",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Waktu" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{formatDate(row.getValue("payment_on"))}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { setCurrentRow, setOpen } = useKas();
      return (
        <TableRowActions
          row={row}
          setOpen={setOpen}
          setCurrentRow={setCurrentRow}
        />
      );
    },
  },
];
