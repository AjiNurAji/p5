import { User } from "@/types";
import { useKas } from "../../context/kas-context"
import { KasActionDialog } from "./kas-action-dialog";

export const KasDialogs = ({ users }: {
  users: User[] | null
}) => {
  const { open, setOpen, currentRow, setCurrentRow } = useKas();

  return (
    <>
      <KasActionDialog
        key="kas-add"
        users={users}
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
    </>
  )
}