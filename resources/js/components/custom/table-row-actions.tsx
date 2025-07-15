import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit3, Ellipsis, EllipsisVertical, Trash2 } from "lucide-react";

interface DataTableRowActionsProps {
  row: any;
  setCurrentRow: (c: any) => void;
  setOpen: (open: any) => void;
  table: boolean;
}

export function TableRowActions({
  table = true,
  row,
  setCurrentRow,
  setOpen,
}: DataTableRowActionsProps) {
  return (
    <DropdownMenu modal={false}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant={table ? "ghost" : "outline"}
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              {table ? (
                <Ellipsis className="size-4" />
              ) : (
                <EllipsisVertical className="size-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p className="capitalize">opsi lainnya</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(table ? (row.original as any) : row);
            setOpen("edit");
          }}
          className="cursor-pointer"
        >
          Ubah
          <DropdownMenuShortcut>
            <Edit3 size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(table ? (row.original as any) : row);
            setOpen("delete");
          }}
          className="cursor-pointer text-red-500!"
        >
          Hapus
          <DropdownMenuShortcut>
            <Trash2 size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
