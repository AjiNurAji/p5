import useDialogState from "@/hooks/use-dialog";
import React, { useState } from "react";
import { Task } from "../components/data/schema";
import { Matkul } from "@/pages/matkul/components/data/schema";

type TaksDialogType = 'add' | 'edit' | 'delete';

interface TasksContextType {
  open: TaksDialogType | null;
  setOpen: (str: TaksDialogType | null) => void;
  currentRow: Task | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>;
  matkuls: Matkul[] | null;
  setMatkuls: React.Dispatch<React.SetStateAction<Matkul[] | null>>
}

const TasksContext = React.createContext<TasksContextType | null>(null);

interface Props {
  children: React.ReactNode;
  matkuls: Matkul[],
}

const TasksProvider = ({ children, matkuls: data }: Props) => {
  const [open, setOpen] = useDialogState<TaksDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Task | null>(null);
  const [matkuls, setMatkuls] = useState<Matkul[] | null>(data || null)

  return (
    <TasksContext value={{ open, setOpen, currentRow, setCurrentRow, matkuls, setMatkuls }}>
      {children}
    </TasksContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const tasksContext = React.useContext(TasksContext);

  if (!tasksContext) {
    throw new Error('useTasks has to be used within <TasksContext>');
  }

  return tasksContext;
}

export default TasksProvider;