import useDialogState from "@/hooks/use-dialog";
import { User } from "@/types";
import React, { useState } from "react";

type UsersDialogType = 'add' | 'edit' | 'delete';

interface UsersContextType {
  open: UsersDialogType | null;
  setOpen: (str: UsersDialogType | null) => void;
  currentRow: User | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>;
}

const UsersContext = React.createContext<UsersContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const UsersProvider = ({ children }: Props) => {
  const [open, setOpen] = useDialogState<UsersDialogType>(null);
  const [currentRow, setCurrentRow] = useState<User | null>(null);

  return (
    <UsersContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UsersContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => {
  const usersContext = React.useContext(UsersContext);

  if (!usersContext) {
    throw new Error('useUsers has to be used within <UsersContext>');
  }

  return usersContext;
}

export default UsersProvider;