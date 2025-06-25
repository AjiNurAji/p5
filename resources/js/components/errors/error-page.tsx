import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Head, Link } from "@inertiajs/react";
import React from "react";

export const ErrorPage = ({
  code = 500,
  error = "Wah! Ada yang salah nih.",
  message = "Kami mohon maaf atas ketidaknyamanan ini. <br /> Silakan coba lagi nanti.",
  className
}: {
  code?: number;
  error?: string;
  message?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('h-full', className)}>
      <Head title={code.toString()} />
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>{code}</h1>
        <span className='font-medium'>{error}</span>
        <p className='text-muted-foreground text-center'>
          {message}
        </p>
        {code !== 503 && (
          (<div className='mt-6 flex gap-4'>
            <Button variant='outline' onClick={() => history.go(-1)}>
              Kembali
            </Button>
            <Button asChild>
              <Link href={route('dashboard')}>
                Kembali ke Dashboard</Link>
            </Button>
          </div>)
        )}
      </div>
    </div>
  )
}