import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { SharedData, NavGroup, User } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavGroup[] }) {
  const { url, props: { auth: { user } } } = usePage<SharedData>();
  return (
    <>
      {items.map((item) => (
        item.access ?
          item.access?.split(',').map((a) => (
            a === user.role && (
              <MenuAccess key={`${item.title}-${a}`} url={url} item={item} user={user} />
            )
          ))
          :
          <MenuAccess key={item.title} url={url} item={item} user={user} />
      ))}
    </>
  );
}

const MenuAccess = ({ item, url, user }: { item: NavGroup, url: string, user: User }) => (
  <SidebarGroup className="px-2 py-0">
    <SidebarGroupLabel className='capitalize'>{item.title}</SidebarGroupLabel>
    <SidebarMenu>
      {item.items.map((i) => (
        i.access ? i.access?.split(',').map((a) => (
          a === user.role && (
            <SidebarMenuItem key={i.title}>
              <SidebarMenuButton asChild isActive={url.startsWith(i.href)} tooltip={{ children: i.title }}>
                <Link href={i.href} prefetch>
                  {i.icon && <i.icon />}
                  <span className='capitalize'>{i.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))) : (
          <SidebarMenuItem key={i.title}>
            <SidebarMenuButton asChild isActive={url.startsWith(i.href)} tooltip={{ children: i.title }}>
              <Link href={i.href} prefetch>
                {i.icon && <i.icon />}
                <span className='capitalize'>{i.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      ))}
    </SidebarMenu>
  </SidebarGroup>
)