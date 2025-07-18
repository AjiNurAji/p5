import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { KasViewOptions } from "./kas-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  all: boolean;
  setAll: (value: boolean) => void;
}

export const KasTableToolbar = <TData,>({
  table,
  all,
  setAll,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const {
    auth: { user },
  } = usePage<SharedData>().props;
  const tabs = [
    { value: true, label: "Semua" },
    { value: false, label: "Saya" },
  ];

  return (
    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center w-full">
      <div className="flex flex-1 items-center space-x-2 w-full">
        <Input
          placeholder="Cari transaksi mahasiswa..."
          value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("user")?.setFilterValue(event.target.value)
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
      <div className="flex d items-center justify-between space-x-2 gap-y-2 w-full">
        {user.role !== "member" && (
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-lg bg-neutral-100 p-1 sm:justify-start dark:bg-neutral-800">
            {tabs.map(({ value, label }) => (
              <button
                key={label}
                onClick={() => setAll(value)}
                className={cn(
                  "flex items-center rounded-md px-3.5 py-1.5 transition-colors",
                  all === value
                    ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100"
                    : "text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60",
                )}
              >
                <span className="w-max text-xs">{label}</span>
              </button>
            ))}
          </div>
        )}
        <KasViewOptions table={table} />
      </div>
    </div>
  );
};
