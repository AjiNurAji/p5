import { ErrorPage } from "@/components/errors/error-page";
import React from "react";

const Errors = ({ code }: { code: number }) => {
  // error title
  const title: string | undefined = {
    503: "Situs sedang dalam pemeliharaan!",
    404: "Ups! Halaman Tidak Ditemukan!",
    403: "Akses Dibatasi!",
  }[code];

  // error message
  const message: React.JSX.Element | undefined = {
    503: (
      <p>
        Situs ini sedang tidak tersedia untuk sementara waktu. <br /> Kami akan
        kembali online dalam waktu dekat.
      </p>
    ),
    404: (
      <p>
        Halaman yang Anda cari tampaknya tidak ada <br /> atau mungkin telah
        dihapus.
      </p>
    ),
    403: (
      <p>
        Upss! Anda tidak memiliki izin <br />
        untuk melihat halaman ini.
      </p>
    ),
  }[code];

  return (
    <ErrorPage
      code={code}
      error={title}
      message={message}
      className="h-screen"
    />
  );
};

export default Errors;
