import { formatDate } from "@/components/custom/date-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SharedData } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import toast from "react-hot-toast";

type Props = {
  canAdded: boolean;
  active_bill: {
    name: string;
    date_of_bill: Date;
  };
} & SharedData;

export const CardBillAdded = ({className}: { className?: string }) => {
  const { canAdded, active_bill } = usePage<Props>().props;
  const { post, processing } = useForm();

  const handleSubmit = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const loading = toast.loading("Memproses...");

      post(route("bill.store"), {
        onSuccess: (e) =>
          toast.success(e.props.success?.message, { id: loading }),
        onError: (e) => {
          console.log(e)
          toast.error(e?.message, { id: loading })
        },
        showProgress: false,
      });
    },
    [],
  );

  return (
    <Card className={cn("pt-0", className)}>
      <CardContent className="px-6 pt-6 flex items-center">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-lg font-bold">{active_bill?.name}</span>
          <span className="text-sm text-muted-foreground">
            ({formatDate(new Date(active_bill?.date_of_bill))})
          </span>
        </div>
        <Button className="ml-auto" size="sm" disabled={processing || !canAdded} onClick={handleSubmit} aria-disabled={!canAdded || processing}>
          Tagih
        </Button>
      </CardContent>
    </Card>
  );
};
