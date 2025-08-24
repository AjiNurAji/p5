import { TableColumnHeader } from "@/components/custom/table-column-header";
import { LongText } from "@/components/long-text";
import { ColumnDef } from "@tanstack/react-table";
import { KasOfWeek } from "../../data/kas-of-week-schema";
import { Kas } from "@/types";

export const kasOfWeekColumn: ColumnDef<KasOfWeek>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Nama Mahasiswa" />
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
    accessorKey: "kas",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Sampai minggu ke" />
    ),
    cell: ({ row }) => {
      const kas = row.getValue("kas") as Kas[];

      const result = kas.map(({ nominal }) => nominal).reduce((p, c) => p + c, 0) / 5000;

      return (
      <div className="w-fit text-nowrap capitalize">
        {result ? result : "Belum bayar samsek!"}
      </div>
    )},
    enableSorting: false,
    enableHiding: false,
  },
];
