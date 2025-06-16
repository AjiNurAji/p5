import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { NavGroup, NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder, LayoutGrid, ListTodo, Receipt, ReceiptText, UsersRound } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavGroup[] = [
  {
    title: "Umum",
    items: [
      {
        title: 'dasbor',
        href: '/dashboard',
        icon: LayoutGrid,
      },
      {
        title: 'kas',
        href: '/kas',
        icon: ReceiptText
      },
      {
        title: 'tugas',
        href: '/tasks',
        icon: ListTodo
      },
    ]
  },
  {
    title: 'Pengguna',
    access: 'superadmin,admin',
    items: [
      {
        title: 'Pengguna',
        href: '/users',
        icon: UsersRound
      }
    ]
  },
  {
    title: 'transaksi',
    access: 'superadmin,admin',
    items: [
      {
        title: 'Kas',
        href: '/transaction',
        icon: Receipt
      }
    ]
  }
];

const footerNavItems: NavItem[] = [
  {
    title: 'Pusat Data',
    href: '/repository',
    icon: Folder,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
