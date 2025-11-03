import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";

interface Props {
  users: User[] | null;
  value: string;
  setData: (key: string, value: string) => void;
  [key: string]: any;
}

export const KasUserFilter = ({ users, value, setData, ...props }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleChange = React.useCallback((value: string) => {
    setData("id_number", value);
  }, []);

  const selected = users?.find((user) => user.id_number === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          {...props}
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected
            ? selected.name
            : "Pilih mahasiswa..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="end">
        <Command>
          <CommandInput placeholder="Cari mahasiswa..." className="h-9" />
          <CommandList>
            <CommandEmpty>Mahasiswa tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {users?.map((user) => user.id_number !== import.meta.env.VITE_EXPEND_ID && (
                <CommandItem
                  key={user.name}
                  value={user.name}
                  disabled={user.id_number === import.meta.env.VITE_EXPEND_ID}
                  onSelect={() => {
                    handleChange(user.id_number === value ? "" : user.id_number)
                    setOpen(false)
                  }}
                >
                  {user.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === user.id_number ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
};
