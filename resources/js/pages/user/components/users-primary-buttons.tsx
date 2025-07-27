import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { useUsers } from "../context/users-context";

export const UsersPrimaryButtons = () => {
  const { setOpen } = useUsers();
  return (
    <div className="flex">
      <Button className="space-x-1" onClick={() => setOpen("add")}>
        <span>Tambah Mahasiswa</span> <UserRoundPlus className="size-5" />
      </Button>
    </div>
  );
};
