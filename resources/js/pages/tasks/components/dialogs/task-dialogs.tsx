import { useTasks } from "../../context/tasks-context";
import { TaskActionDialog } from "./task-action-dialog";


export const TaskDialogs = () => {
  const { open, setOpen, currentRow, setCurrentRow, matkuls } = useTasks();

  return (
    <>
      <TaskActionDialog
        key='task-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
        matkuls={matkuls}
      />
      
      {currentRow && (
        <>
          <TaskActionDialog
            key={`task-edit-${currentRow.id_task}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
            matkuls={matkuls}
          />
          {/* <MatkulDeleteDialog
            key={`matkul-delete-${currentRow.id_matkuls}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          /> */}
        </>
      )}
    </>
  )
}