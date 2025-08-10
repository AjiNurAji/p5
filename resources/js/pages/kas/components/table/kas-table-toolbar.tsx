import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAccess } from "@/layouts/authorized-layout";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { KasViewOptions } from "./kas-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  all: boolean;
  setAll?: (value: boolean) => void;
}

export const KasTableToolbar = <TData,>({
  table,
  all,
  setAll,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const tabs = [
    { value: true, label: "Semua" },
    { value: false, label: "Saya" },
  ];
  const {
    auth: { user },
  } = usePage<SharedData>().props;

  const Access = getAccess(user.role, ["superadmin", "kosma", "bendahara"]);

  return (
    <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      {Access && (
        <div className="flex w-full flex-1 items-center space-x-2">
          <Input
            placeholder="Cari transaksi mahasiswa..."
            id="mhs"
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
      )}
      <KasViewOptions table={table} />
    </div>
  );
};
