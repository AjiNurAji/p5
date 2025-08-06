import { Kas, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RecentPayment } from "./recent-payment";

interface Props extends SharedData {
  payment_kas: {
    title: string;
    data: Kas[];
  };
}

export const PaymentListCard = () => {
  const { payment_kas } = usePage<Props>().props;

  return (
    <Card className="col-span-1 lg:col-span-7">
      <CardHeader>
        <CardTitle className="capitalize">{payment_kas.title}</CardTitle>
        <CardDescription>
          Transaksi kas terbaru, Terakhir kali membayar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {payment_kas.data.length ? (
          <RecentPayment data={payment_kas.data} />
        ) : (
          <div className="w-full text-center text-xs">
            Belum ada transaksi bulan ini.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
