import { formatDate } from "@/components/custom/date-picker";
import { TableColumnHeader } from "@/components/custom/table-column-header";
import { LongText } from "@/components/long-text";
import { ColumnDef } from "@tanstack/react-table";
import { Bill } from "../../data/bill-schema";

export const billColumns: ColumnDef<Bill>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Tagihan" />
    ),
    cell: ({ getValue }) => (
      <LongText className="max-w-36 capitalize">
        {getValue() as string}
      </LongText>
    ),
    enableHiding: false,
    sortDescFirst: false,
  },
  {
    accessorKey: "date_of_bill",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Tanggal Tagihan" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">
        {formatDate(row.getValue("date_of_bill"))}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
];
