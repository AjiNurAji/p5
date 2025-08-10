import React from "react";

const options: Intl.NumberFormatOptions = {
  currency: "IDR",
  style: "currency",
  maximumFractionDigits: 0,
}

export default function useCurrency(value: string | number): string {
  const [currency, setCurrency] = React.useState<string>(() =>
    Intl.NumberFormat("id-ID", options).format(Number(value)),
  );

  React.useEffect(() => {
    setCurrency(
      Intl.NumberFormat("id-ID", options).format(Number(value)),
    );
  }, [value]);

  return currency;
}
