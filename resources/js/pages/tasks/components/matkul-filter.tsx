import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Matkul } from "@/types";
import { CheckIcon, PlusCircle } from "lucide-react";

interface MatkulFilterProps {
  matkuls: Matkul[];
  title: string;
  selectedMatkul: Set<string>;
  setSelectedMatkul: (matkul: Set<string>) => void;
}

export const MatkulFilter = ({
  selectedMatkul,
  setSelectedMatkul,
  title,
  matkuls,
}: MatkulFilterProps) => {
  const selectedValues = new Set(selectedMatkul);
  const isMobile = useIsMobile();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal sm:hidden block"
              >
                {selectedValues.size} terpilih
              </Badge>
              <div className="hidden space-x-1 sm:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} terpilih
                  </Badge>
                ) : (
                  matkuls
                    .filter((matkul) => selectedValues.has(matkul.id_matkul))
                    .map((matkul) => (
                      <Badge
                        variant="secondary"
                        key={matkul.id_matkul}
                        className="rounded-sm px-1 font-normal"
                      >
                        {matkul.name}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0"
        align={isMobile ? "start" : "end"}
      >
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>Tidak ada hasil yang ditemukan.</CommandEmpty>
            <CommandGroup>
              {matkuls.map((matkul) => {
                const isSelected = selectedValues.has(matkul.id_matkul);
                return (
                  <CommandItem
                    key={matkul.id_matkul}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(matkul.id_matkul);
                      } else {
                        selectedValues.add(matkul.id_matkul);
                      }
                      setSelectedMatkul(selectedValues);
                    }}
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    <span>{matkul.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedMatkul(new Set())}
                    className="justify-center text-center"
                  >
                    Hapus filter
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
