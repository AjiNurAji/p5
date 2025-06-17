import { useCallback, useEffect, useState } from "react"

export type Layout = 'sidebar' | 'header' | string;

const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === 'undefined') {
    return;
  }

  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

export const useLayout = () => {
  const [layout, setLayout] = useState<Layout>(localStorage.getItem('layout') || 'sidebar');

  const updateLayout = useCallback((mode: Layout) => {
    setLayout(mode);

    // store in localstorage
    localStorage.setItem('layout', mode);

    // store in cookie for ssr
    setCookie('layout', mode);
  }, [])

  useEffect(() => {
    const savedLayout = localStorage.getItem('layout') as Layout | null;

    updateLayout(layout || savedLayout || 'sidebar')
  }, [layout])

  return { layout, setLayout } as const;
}