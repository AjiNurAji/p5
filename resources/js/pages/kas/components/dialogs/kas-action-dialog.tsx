"use client";

import { DatePicker } from "@/components/custom/date-picker";
import { ActionsDialog } from "@/components/custom/dialogs/actions-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import useCurrency from "@/hooks/use-currency";
import { Kas, User } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import toast from "react-hot-toast";
import { KasUserFilter } from "../kas-user-filter";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: Kas | null;
  users: User[] | null;
}

type KasForm = {
  id_number: string;
  nominal: number;
  payment_on: Date;
  note: string;
  type: "income" | "expand" | string;
  method: "cash" | "cashless" | string;
};

export const KasActionDialog = ({
  currentRow,
  open,
  onOpenChange,
  users,
}: Props) => {
  const isEdit = !!currentRow;

  const { data, setData, post, processing } = useForm<Required<KasForm>>(
    isEdit
      ? {
          id_number: currentRow.id_number,
          nominal: currentRow.nominal,
          payment_on: currentRow.payment_on,
          method: currentRow.method,
          type: currentRow.type,
          note: currentRow.note,
        }
      : {
          id_number: "",
          nominal: 0,
          payment_on: new Date(),
          method: "cash",
          type: "income",
          note: "",
        },
  );

  const methodType = [
    { value: "cash", label: "Tunai" },
    { value: "cashless", label: "Transfer" },
  ];

  const paymentType = [
    { value: "income", label: "Pemasukan" },
    { value: "expand", label: "Pengeluaran" },
  ];

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const loading = toast.loading("Menyimpan data...");

    post(isEdit ? route("kas.update", currentRow.id_kas) : route("kas.store"), {
      onSuccess: (e) => toast.success(e.props.success.message, { id: loading }),
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
      onFinish: () => {
        onOpenChange(false);
        handleResetForm();
      },
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
    <ActionsDialog
      handleResetForm={handleResetForm}
      processing={processing}
      formName="kas-form"
      currentRow={currentRow}
      open={open}
      onOpenChange={onOpenChange}
      title="Kas"
    >
      <form id="kas-form" onSubmit={handleSubmit} className="space-y-4 p-0.5">
        <div className="grid gap-2">
          <Label htmlFor="student">Nama Mahasiswa</Label>

          <KasUserFilter
            id="student"
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
              onValueChange={(value) => setData("type", value)}
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
            value={data.note}
            onChange={(e) => setData("note", e.target.value)}
            placeholder="Cth. Pembayaran minggu ke 1"
          ></Textarea>
        </div>
      </form>
    </ActionsDialog>
  );
};
