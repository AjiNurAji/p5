import { useSemester } from "../../context/semester-context";
import { SemesterActionDialog } from "./semester-action-dialog";
import { SemesterDeleteDialog } from "./semester-delete-dialog";

export const SemesterDialogs = () => {
  const { open, setOpen, currentRow, setCurrentRow } = useSemester();

  return (
    <>
      <SemesterActionDialog
        key="semester-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
      {currentRow && (
        <>
          <SemesterDeleteDialog
            key={`semester-delete-${currentRow.semester}`}
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  );
};
