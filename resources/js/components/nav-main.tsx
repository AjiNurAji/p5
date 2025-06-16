import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { SharedData, NavGroup, NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavGroup[] }) {
  const { url, props: { auth: { user } } } = usePage<SharedData>();
  return (
    <>
      {items.map((item) => (
        item.access ?
          item.access?.split(',').map((a) => (
            a === user.role && (
              <MenuAccess key={`${item.title}-${a}`} url={url} item={item} />
            )
          ))
          :
          <MenuAccess key={item.title} url={url} item={item} />
      ))}
    </>
  );
}

const MenuAccess = ({ item, url }: { item: NavGroup, url: string }) => (
  <SidebarGroup className="px-2 py-0">
    <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
    <SidebarMenu>
      {item.items.map((i) => (
        <SidebarMenuItem key={i.title}>
          <SidebarMenuButton asChild isActive={url.startsWith(i.href)} tooltip={{ children: i.title }}>
            <Link href={i.href} prefetch>
              {i.icon && <i.icon />}
              <span>{i.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  </SidebarGroup>
)