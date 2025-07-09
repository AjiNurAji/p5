import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Matkul } from "@/types";
import { MatkulFilter } from "./matkul-filter";

interface TaskFiltersProps {
  statusType: string;
  setStatusType: (status: string) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  matkulFilter: Set<string>;
  setMatkulFilter: (matkul: Set<string>) => void;
  matkuls: Matkul[];
}

export const TaskFilters = ({
  matkuls,
  matkulFilter,
  setMatkulFilter,
  statusType,
  setStatusType,
  searchTerm,
  setSearchTerm,
}: TaskFiltersProps) => {
  const tabs: { value: string; label: string }[] = [
    { value: "all", label: "Semua" },
    { value: "pending", label: "Belum dikerjakan" }, // empety on execution
    { value: "progress", label: "Sedang dikerjakan" },
    { value: "finished", label: "Sudah dikerjakan" },
  ];

  return (
    <>
      <div className="flex flex-col items-start sm:items-center gap-2 sm:flex-row sm:gap-4">
        <Input
          placeholder="Cari tugas..."
          className="h-9 w-full lg:w-[250px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MatkulFilter
          title="Mata Kuliah"
          matkuls={matkuls}
          selectedMatkul={matkulFilter}
          setSelectedMatkul={setMatkulFilter}
        />
      </div>
      <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-lg bg-neutral-100 p-1 sm:justify-start dark:bg-neutral-800">
        {tabs.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setStatusType(value)}
            className={cn(
              "flex items-center rounded-md px-3.5 py-1.5 transition-colors",
              statusType === value
                ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100"
                : "text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60",
            )}
          >
            <span className="w-max text-xs">{label}</span>
          </button>
        ))}
      </div>
    </>
  );
};
