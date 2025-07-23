import { User } from "@/types";
import { useKas } from "../../context/kas-context";
import { KasActionDialog } from "./kas-action-dialog";
import { KasDeleteDialog } from "./kas-delete-dialog";

export const KasDialogs = ({ users }: { users: User[] | null }) => {
  const { open, setOpen, currentRow, setCurrentRow } = useKas();

  return (
    <>
      <KasActionDialog
        key="kas-add"
        users={users}
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
      {currentRow && (
        <>
          <KasActionDialog
            key={`kas-edit-${currentRow.id_number}`}
            users={users}
            open={open === "edit"}
            currentRow={currentRow}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
          />
          <KasDeleteDialog
            key={`kas-delete-${currentRow.id_number}`}
            open={open === "delete"}
            currentRow={currentRow}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
          />
        </>
      )}
    </>
  );
};
