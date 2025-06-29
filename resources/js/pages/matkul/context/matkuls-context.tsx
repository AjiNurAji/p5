import useDialogState from "@/hooks/use-dialog";
import { Matkul } from "@/types";
import React, { useState } from "react";

type MatkulsDialogType = 'add' | 'edit' | 'delete';

interface MatkulsContextType {
  open: MatkulsDialogType | null;
  setOpen: (str: MatkulsDialogType | null) => void;
  currentRow: Matkul | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Matkul | null>>;
}

const MatkulsContext = React.createContext<MatkulsContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const MatkulsProvider = ({ children }: Props) => {
  const [open, setOpen] = useDialogState<MatkulsDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Matkul | null>(null);

  return (
    <MatkulsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </MatkulsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMatkuls = () => {
  const matkulsContext = React.useContext(MatkulsContext);

  if (!matkulsContext) {
    throw new Error('useMatkuls has to be used within <MatkulsContext>');
  }

  return matkulsContext;
}

export default MatkulsProvider;