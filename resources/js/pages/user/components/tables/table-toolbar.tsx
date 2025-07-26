import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { userTypes } from "../data/data";
import { FacetedFilter } from "./facated-filter";
import { ViewOptions } from "./view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export const TableToolbar = <TData,>({
  table,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap items-end justify-between sm:items-center">
      <div className="flex flex-1 flex-col items-start space-x-2 gap-y-2 sm:flex-row sm:items-center">
        <Input
          placeholder="Cari mahasiswa..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full lg:w-[250px]"
        />
        <div className="flex w-full gap-x-2">
          {table.getColumn("role") && (
            <FacetedFilter
              column={table.getColumn("role")}
              title="Peran"
              options={userTypes.map((t) => ({ ...t }))}
            />
          )}
          <ViewOptions className="flex sm:hidden" table={table} />
        </div>
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
      <ViewOptions table={table} />
    </div>
  );
};
