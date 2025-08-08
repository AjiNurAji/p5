import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types";
import React from "react";

interface Props {
  users: User[] | null;
  value: string;
  setData: (key: string, value: string) => void;
  [key: string]: any;
}

export const KasUserFilter = ({ users, value, setData, ...props}: Props) => {
  const handleChange = React.useCallback((value: string) => {
    setData("id_number", value);
  }, []);

  const selected = users?.find((user) => user.id_number === value);

  return (
    <Select required value={value} onValueChange={(value) => handleChange(value)}>
      <SelectTrigger className="w-full" {...props}>
        {selected ? (
          <SelectValue>{selected?.name}</SelectValue>
        ) : (
          "Pilih mahasiswa"
        )}
      </SelectTrigger>
      <SelectContent position="popper" align="end">
        <ScrollArea className="h-auto max-h-50">
          {users?.map((user) => (
            <SelectItem key={user.id_number} value={user.id_number} id={user.id_number}>
              {user.name}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
};
