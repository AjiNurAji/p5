import { useUsers } from "../context/users-context";
import { ActionDIalog } from "./dialogs/action-dialog";
import { DeleteDialog } from "./dialogs/delete-dialog";

export const UserDialogs = () => {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers();

  return (
    <>
      <ActionDIalog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <ActionDIalog
            key={`user-edit-${currentRow.id_number}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <DeleteDialog
            key={`user-delete-${currentRow.id_number}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}