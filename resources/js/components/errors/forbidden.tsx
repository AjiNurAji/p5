import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

export const Forbidden = () => {
  return (
    <div className='h-full'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>403</h1>
        <span className='font-medium'>Akses Dibatasi</span>
        <p className='text-muted-foreground text-center'>
          Oops! Anda tidak memiliki izin <br />
          untuk melihat halaman ini.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => history.go(-1)}>
            Kembali
          </Button>
          <Button asChild>
            <Link href={route('dashboard')}>
              Kembali ke Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}