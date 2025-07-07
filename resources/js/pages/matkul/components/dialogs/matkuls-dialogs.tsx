import { useMatkuls } from "../../context/matkuls-context"
import { MatkulsActionDialog } from "./matkul-action-dialog";
import { MatkulDeleteDialog } from "./matkul-delete-dialog";

export const MatkulsDialogs = () => {
  const { open, setOpen, currentRow, setCurrentRow } = useMatkuls();

  return (
    <>
      <MatkulsActionDialog
        key='matkul-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />
      {currentRow && (
        <>
          <MatkulsActionDialog
            key={`matkul-edit-${currentRow.id_matkul}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <MatkulDeleteDialog
            key={`matkul-delete-${currentRow.id_matkul}`}
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