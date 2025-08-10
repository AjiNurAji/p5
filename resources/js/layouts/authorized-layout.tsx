import { ErrorPage } from "@/components/errors/error-page";
import { useLayout } from "@/hooks/use-layout";
import { cn } from "@/lib/utils";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import React from "react";

interface AuthorizedProps {
  canAccess: Array<string>;
  children: React.ReactNode;
}

export function getAccess(role: string, canAccess: Array<string>): boolean {
  return canAccess.includes(role);
}

export const AuthorizedLayout = ({ canAccess, children }: AuthorizedProps) => {
  const {
    auth: { user },
  } = usePage<SharedData>().props;

  const access = getAccess(user.role, canAccess);
  const { layout } = useLayout()

  return !access ? (
    <ErrorPage
      withDashBtn
      code={403}
      error="Akses Dibatasi!"
      className={cn(layout === "header" && "h-screen!")}
      message={
        <p>
          Upss! Anda tidak memiliki izin <br />
          untuk melihat halaman ini.
        </p>
      }
    />
  ) : (
    children
  );
};
