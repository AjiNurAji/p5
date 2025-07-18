import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface Props {
  users: User[] | null;
  title: string;
  value: string;
  defaultValue?: string;
  setData: (key: string, value: string) => void;
}

export const KasUserFilter = ({
  users,
  title,
  value,
  defaultValue,
  setData,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? users?.find((user) => user.id_number === value)?.name
            : "Pilih mahasiswa"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Cari mahasiswa..." className="h-9" />

          <CommandList>
            <CommandEmpty>Mahasiswa tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {users?.length ? (
                users.map((user) => (
                  <CommandItem
                    key={user.name}
                    value={user.name}
                    onSelect={(v) => {
                      setData("id_number", user.id_number);
                      setOpen(false)
                    }}
                  >
                    {user.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === user.id_number ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))
              ) : (
                <CommandItem disabled>Belum ada data.</CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
