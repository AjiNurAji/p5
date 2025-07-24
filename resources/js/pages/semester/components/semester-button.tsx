import { Button } from "@/components/ui/button";
import { PiStudent } from "react-icons/pi";
import { useSemester } from "../context/semester-context";

export const SemesterButton = () => {
  const { setOpen } = useSemester();
  return (
    <div className="flex">
      <Button className="space-x-1" onClick={() => setOpen("add")}>
        <span>Tambah Semester</span> <PiStudent className="size-5" />
      </Button>
    </div>
  );
};
