import useDialogState from "@/hooks/use-dialog";
import { Kas } from "@/types";
import React, { useState } from "react";

type KasDialogType = "add" | "edit" | "delete";

interface KasContextType {
  open: KasDialogType | null;
  setOpen: (str: KasDialogType | null) => void;
  currentRow: Kas | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Kas | null>>;
}

const KasContext = React.createContext<KasContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const KasProvider = ({ children }: Props) => {
  const [open, setOpen] = useDialogState<KasDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Kas | null>(null);

  return (
    <KasContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </KasContext>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useKas = () => {
  const kasContext = React.useContext(KasContext);

  if (!kasContext) throw new Error("useKas has to be used within <KasProvider>");

  return kasContext
};

export default KasProvider;
