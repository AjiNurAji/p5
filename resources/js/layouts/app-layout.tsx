import LoadingPage from "@/components/loading-page";
import { useLayout } from "@/hooks/use-layout";
import AppLayoutTemplate from "@/layouts/app/app-sidebar-layout";
import { LayoutContext } from "@/lib/contexts/layout-context";
import type { BreadcrumbItem } from "@/types";
import { WhenVisible } from "@inertiajs/react";
import { Loader } from "lucide-react";
import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import AppHeaderLayout from "./app/app-header-layout";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
  const { layout, setLayout } = useLayout();
  const isMobile = useIsMobile();

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      <WhenVisible data="props" fallback={<LoadingPage />}>
        <>
          <Toaster
            position="top-center"
            toastOptions={{
              loading: {
                icon: <Loader className="size-4 animate-spin" />,
              },
            }}
          />
          {layout === "sidebar" && !isMobile ? (
            <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
              {children}
            </AppLayoutTemplate>
          ) : (
            <AppHeaderLayout breadcrumbs={breadcrumbs} {...props}>
              {children}
            </AppHeaderLayout>
          )}
        </>
      </WhenVisible>
    </LayoutContext.Provider>
  );
};
