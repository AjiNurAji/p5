import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useCurrency from "@/hooks/use-currency";
import { useInitials } from "@/hooks/use-initials";
import { cn } from "@/lib/utils";
import { Kas } from "@/types";
import { Badge } from "../ui/badge";
import { formatDate } from "./date-picker";

export const RecentPayment = ({ data }: { data: Kas[] }) => {
  const getInitials = useInitials();

  return (
    <div className="space-y-8">
      {data.map(({ id_kas, nominal, payment_on, method, user }) => (
        <div className="flex items-center gap-4" key={id_kas}>
          <Avatar className="h-8 w-8 overflow-hidden rounded-full">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-wrap items-center justify-between">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {formatDate(new Date(payment_on))}
              </span>
            </div>
            <div className="grid flex-1 text-sm leading-tight">
              <span className="ml-auto truncate font-medium">
                {useCurrency(nominal)}
              </span>
              <Badge
                variant="secondary"
                className={cn(
                  "ml-auto",
                  method === "cash" && "bg-yellow-500/10 text-yellow-500",
                  method === "cashless" && "bg-blue-500/10 text-blue-500",
                )}
              >
                <span className="truncate text-[10px] capitalize">
                  {method === "cash" ? "tunai" : "transfer"}
                </span>
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
