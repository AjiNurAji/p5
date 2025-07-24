import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, getFacetedRowModel, getFacetedUniqueValues, getSortedRowModel } from "@tanstack/react-table";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { ColumnDef, ColumnFiltersState, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import { useState } from "react";
import { KasTableToolbar } from "./kas-table-toolbar";
import { TablePagination } from "@/components/custom/table-pagination";
import { Kas } from "../../data/schema";
import { WhenVisible } from "@inertiajs/react";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps {
  columns: ColumnDef<Kas>[];
  data: Kas[];
  all: boolean;
  setAll: (value: boolean) => void;
}


export const KasTable = ({ columns, data, all, setAll }: DataTableProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <KasTableToolbar all={all} setAll={setAll} table={table} />
      <WhenVisible data="kaslist" fallback={<Skeleton className="w-full h-20 rounded-xl" />}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="group/row">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.className ?? ''}
                    >
                      {header.isPlaceholder ? null : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className='group/row'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cell.column.columnDef.meta?.className ?? ''}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    {
                      !table.getRowModel().rows?.length && !columnFilters.length ? "Belum ada data." : "Tidak ada hasil ditemukan."
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </WhenVisible>
      <TablePagination table={table} />
    </div>
  )
}