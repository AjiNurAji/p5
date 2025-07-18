import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function useTimeAgo(date: string | Date): string {
  const [timeAgo, setTimeAgo] = useState(() =>
    formatDistanceToNow(new Date(date), { addSuffix: true, locale: id }),
  );

  const time = 60 * 1000; // 1 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(
        formatDistanceToNow(new Date(date), { addSuffix: true, locale: id }),
      );
    }, time); 

    return () => clearInterval(interval);
  }, [date]);

  return timeAgo;
}
