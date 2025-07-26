import { formatDate } from "@/components/custom/date-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useInitials } from "@/hooks/use-initials";
import { User } from "@/types";

interface Props {
  user: User;
  executionIn: Date;
}

export const CardUserExecution = ({ user, executionIn }: Props) => {
  const getInitials = useInitials();

  return (
    <Card>
      <CardContent className="flex w-full items-center gap-2">
        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            Di kerjakan pada: {formatDate(new Date(executionIn))}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
