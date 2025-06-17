import { useLayout } from '@/hooks/use-layout';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import AppHeaderLayout from './app/app-header-layout';
import { LayoutContext } from '@/lib/contexts/layout-context';
import  { Toaster } from 'react-hot-toast';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
  const { layout, setLayout } = useLayout();

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      <Toaster position='top-center' />
      {layout === 'sidebar' ? (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
          {children}
        </AppLayoutTemplate>
      ) : (
        <AppHeaderLayout breadcrumbs={breadcrumbs} {...props}>
          {children}
        </AppHeaderLayout>
      )}
    </LayoutContext.Provider>
  );
};