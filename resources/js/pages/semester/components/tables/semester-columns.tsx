import { TableColumnHeader } from "@/components/custom/table-column-header";
import { LongText } from "@/components/long-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useSemester } from "../../context/semester-context";
import { SemesterType } from "../data/schema";
import { getAccess } from "@/layouts/authorized-layout";

export const columns: ColumnDef<SemesterType>[] = [
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
    accessorKey: "semester",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Semester" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36 capitalize">
        {row.getValue("semester")}
      </LongText>
    ),
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] lg:drop-shadow-none dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell",
      ),
    },
    enableHiding: false,
    sortDescFirst: false,
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("is_active") as boolean;
      return (
        <div className="w-fit text-nowrap">
          <Badge
            variant="secondary"
            className={cn(
              "text-xs",
              value && "bg-green-500/15 text-green-500",
              !value && "bg-red-500/15 text-red-500",
            )}
          >
            {value ? "Aktif" : "Tidak Aktif"}
          </Badge>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { setCurrentRow, setOpen } = useSemester();
      const {
        auth: {
          user: { role },
        },
      } = usePage<SharedData>().props;
      getAccess(role, ["superadmin"]) && (
        <Button
          onClick={() => {
            setCurrentRow(row.original);
            setOpen("delete");
          }}
          variant="ghost"
          size="icon"
          className="hover:bg-destructive/20 dark:hover:bg-destructive/50!"
        >
          <Trash2 className="text-red-500" />
        </Button>
      );
    },
  },
];
