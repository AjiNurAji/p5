import { useTasks } from "../../context/tasks-context";
import { TaskActionDialog } from "./task-action-dialog";
import { TaskDeleteDialog } from "./task-delete-dialog";

export const TaskDialogs = () => {
  const { open, setOpen, currentRow, setCurrentRow, matkuls } = useTasks();

  return (
    <>
      <TaskActionDialog
        key="task-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
        matkuls={matkuls}
      />

      {currentRow && (
        <>
          <TaskActionDialog
            key={`task-edit-${currentRow.id_task}`}
            open={open === "edit"}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
            matkuls={matkuls}
          />
          <TaskDeleteDialog
            key={`task-delete-${currentRow.id_task}`}
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
