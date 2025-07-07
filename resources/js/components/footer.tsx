export const Footer = () => (
  <div className="flex w-full mt-auto items-center justify-between px-4 py-3">
    <p className="text-[10px] text-muted-foreground">
      &copy; {new Date().getFullYear()} - Pioneers Five by{' '}
      <a
        href="https://instagram.com/ajnrji_"
        className="inline-flex items-center space-x-1 font-medium underline underline-offset-4"
        target="_blank"
      >
        Aji Nur Aji
        <svg width={10} height={11} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5">
          <path d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001" stroke="currentColor" strokeLinecap="square" />
        </svg>
      </a>
      .
    </p>
    <a
      target="_blank"
      href="https://ikmi.ac.id"
      className="inline-flex items-center space-x-1 text-[10px] font-medium text-muted-foreground underline underline-offset-4"
    >
      STMIK IKMI CIREBON{' '}
      <svg width={10} height={11} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5">
        <path d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001" stroke="currentColor" strokeLinecap="square" />
      </svg>
    </a>
  </div>
)