import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { DollarSign } from "lucide-react";

export const KasButton = () => {
  return (
    <div className="flex">
      {/* <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Tambah Transaksi</span> <DollarSign className='size-5' />
      </Button> */}
      <Link
        href={route("kas.create")}
        className={cn(
          buttonVariants({
            variant: "default",
          }),
          "space-x-1",
        )}
      >
        <span>Tambah Transaksi</span>
        <DollarSign className="size-5" />
      </Link>
    </div>
  );
};
