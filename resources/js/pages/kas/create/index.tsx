import { DatePicker } from "@/components/custom/date-picker";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import useCurrency from "@/hooks/use-currency";
import AppLayout from "@/layouts/app-layout";
import { AuthorizedLayout } from "@/layouts/authorized-layout";
import { BreadcrumbItem, SharedData, User } from "@/types";
import { useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";
import toast from "react-hot-toast";
import { KasUserFilter } from "../components/kas-user-filter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

type KasForm = {
  id_number: string;
  nominal: number;
  payment_on: Date;
  note: string;
  type: "income" | "expend" | string;
  method: "cash" | "cashless" | string;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Kas",
    href: route("kas.index"),
  },
  {
    title: "Tambah Transaksi",
    href: route("kas.create"),
  },
];

interface Props extends SharedData {
  users: User[] | null;
}

const CreateKasPage = ({ users }: Props) => {
  const Access = ["superadmin", "bendahara", "kosma"];
  const [isIncome, setIsIncome] = React.useState<boolean>(true);

  const { data, setData, post, processing } = useForm<Required<KasForm>>({
    id_number: "",
    nominal: 0,
    payment_on: new Date(),
    method: "cash",
    type: "income",
    note: "",
  });

  const methodType = [
    { value: "cash", label: "Tunai" },
    { value: "cashless", label: "Transfer" },
  ];

  const paymentType = [
    { value: "income", label: "Pemasukan" },
    { value: "expend", label: "Pengeluaran" },
  ];

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const loading = toast.loading("Menyimpan data...");

    post(route("kas.store"), {
      onSuccess: (e) => {
        toast.success(e.props.success.message, { id: loading });
      },
      onError: (e) => {
        if (e?.message) {
          return toast.error(e?.message, { id: loading });
        } else if (e?.id_kas) {
          return toast.error(e?.id_kas, { id: loading });
        } else if (e?.nominal) {
          return toast.error(e?.nominal, { id: loading });
        } else if (e?.payment_on) {
          return toast.error(e?.payment_on, { id: loading });
        } else if (e?.method) {
          return toast.error(e?.method, { id: loading });
        } else if (e?.type) {
          return toast.error(e?.type, { id: loading });
        } else if (e?.note) {
          return toast.error(e?.note, { id: loading });
        } else if (e?.role) {
          return toast.error(e?.role, { id: loading });
        }

        return toast.error("Terjadi kesalahan, silahkan coba lagi!");
      },
      onFinish: () => handleResetForm(),
      showProgress: false,
    });
  };

  const handleResetForm = () => {
    setData({
      id_number: "",
      nominal: 0,
      method: "cash",
      type: "income",
      payment_on: new Date(),
      note: "",
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AuthorizedLayout canAccess={Access}>
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

          <Button size="sm" variant="destructive" className="w-fit" onClick={() => history.go(-1)}>
            <ArrowLeft />
          </Button>
            <Card>
              <CardContent>
                <form id="kas-form" onSubmit={handleSubmit} className="space-y-4 p-0.5">
                  <div className="grid gap-2">
                    <Label htmlFor="student">Nama Mahasiswa</Label>

                    <KasUserFilter
                      id="student"
                      disabled={!isIncome}
                      users={users}
                      value={data.id_number}
                      setData={setData}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nominal">Nominal</Label>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <Input readOnly disabled value={useCurrency(data.nominal)} />
                      <Input
                        type="text"
                        id="nominal"
                        required
                        name="nominal"
                        value={data.nominal}
                        onChange={(e) => {
                          const regEx = /[^0-9]/g;
                          if (regEx.test(e.target.value))
                            return toast.error("Hanya boleh mengisikan angka!");

                          setData("nominal", Number(e.target.value));
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <Label htmlFor="cash">Metode Pembayaran</Label>
                      <RadioGroup
                        name="method"
                        id="method"
                        defaultValue={data.method}
                        onValueChange={(value) => setData("method", value)}
                      >
                        {methodType.map(({ value, label }) => (
                          <div className="flex items-center space-x-2" key={value}>
                            <RadioGroupItem value={value} id={value} />
                            <Label htmlFor={value}>{label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="income">Jenis Transaksi</Label>
                      <RadioGroup
                        name="type"
                        id="type"
                        defaultValue={data.type}
                        onValueChange={(value) => {
                          if (value === "income") {
                            setIsIncome(true);
                          } else {
                            setIsIncome(false);
                            setData("id_number", import.meta.env.VITE_EXPEND_ID);
                          }

                          setData("type", value);
                        }}
                      >
                        {paymentType.map(({ value, label }) => (
                          <div className="flex items-center space-x-2" key={value}>
                            <RadioGroupItem value={value} id={value} />
                            <Label htmlFor={value}>{label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="payment_on">Tanggal Bayar</Label>
                    <DatePicker
                      withTime
                      value={new Date(data.payment_on)}
                      keyName="payment_on"
                      setValue={setData}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="note">Catatan</Label>
                    <Textarea
                      id="note"
                      name="note"
                      required
                      value={data.note}
                      onChange={(e) => setData("note", e.target.value)}
                      placeholder="Cth. Pembayaran minggu ke 1"
                    ></Textarea>
                  </div>
                  <Button type="submit" disabled={processing}>
                    Tambah
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
      </AuthorizedLayout>
    </AppLayout>
  );
};

export default CreateKasPage;
