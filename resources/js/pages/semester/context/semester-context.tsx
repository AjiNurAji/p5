import useDialogState from "@/hooks/use-dialog";
import { Semester } from "@/types";
import React, { useState } from "react";

type SemesterDialogType = "add" | "delete";

interface SemesterContextType {
  open: SemesterDialogType | null;
  setOpen: (str: SemesterDialogType | null) => void;
  currentRow: Semester | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Semester | null>>;
}

const SemesterContext = React.createContext<SemesterContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const SemesterProvider = ({ children }: Props) => {
  const [open, setOpen] = useDialogState<SemesterDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Semester | null>(null);

  return (
    <SemesterContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </SemesterContext>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSemester = () => {
  const semesterContext = React.useContext(SemesterContext);

  if (!semesterContext) {
    throw new Error("useSemesters has to be used within <SemesterContext>");
  }

  return semesterContext;
};

export default SemesterProvider;
