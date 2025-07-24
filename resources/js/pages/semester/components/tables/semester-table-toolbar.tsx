import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { SemesterViewOptions } from "./semester-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export const SemesterTableToolbar = <TData,>({
  table,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex flex-1 items-start gap-y-2 w-full flex-row sm:items-center space-x-2">
        <Input
          placeholder="Cari semester..."
          value={(table.getColumn("semester")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("semester")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <SemesterViewOptions table={table} />
    </div>
  );
};
