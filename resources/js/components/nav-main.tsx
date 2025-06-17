import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar";
import type { NavCollapsible, NavGroup, NavLink, SharedData, User } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

export const NavMain = ({ items, title }: NavGroup) => {
  const { state } = useSidebar();
  const {
    url,
    props: {
      auth: { user },
    },
  } = usePage<SharedData>();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="capitalize">{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.access) {
            return (
              item.access.split(',').map((a) => {
                if (a === user.role) {
                  const key = `${item.title}-${item.access}`;
                  if (!item.items) return <SidebarMenuLink key={key} item={item} url={url} user={user} />;

                  if (state === "collapsed") return <SidebarMenuCollapsedDropdown key={key} item={item} url={url} user={user} />;

                  return <SidebarMenuCollapsible key={key} item={item} url={url} user={user} />;
                }
              })
            )
          }
          else {
            const key = `${item.title}-${item.access}`;
            if (!item.items) return <SidebarMenuLink key={key} item={item} url={url} user={user} />;

            if (state === "collapsed") return <SidebarMenuCollapsedDropdown key={key} item={item} url={url} user={user} />;

            return <SidebarMenuCollapsible key={key} item={item} url={url} user={user} />;
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
const SidebarMenuLink = ({ item, url, user }: { item: NavLink, url: string, user: User }) => {
  const { setOpenMobile } = useSidebar();

  return (
    item.access ?
      item.access.split(',').map(
        a => (
          a === user.role && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={item.href.includes(url)} tooltip={{ children: item.title }}>
                <Link href={item.href} prefetch onClick={() => setOpenMobile(false)}>
                  {item.icon && <item.icon />}
                  <span className="capitalize">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )
      )
      : (
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={item.href.includes(url)} tooltip={{ children: item.title }}>
            <Link href={item.href} prefetch onClick={() => setOpenMobile(false)}>
              {item.icon && <item.icon />}
              <span className="capitalize">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )
  )
};

const SidebarMenuCollapsedDropdown = ({ item, url, user }: { item: NavCollapsible, url: string, user: User }) => {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton isActive={item.href.includes(url)} tooltip={{ children: item.title }}>
            {item.icon && <item.icon />}
            <span className="capitalize">{item.title}</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>
            {item.title}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map(sub => (
            sub.access ?
              sub.access.split(',').map(a => (
                a === user.role &&
                <DropdownMenuItem key={`${sub.title}-${sub.access}`}>
                  <SidebarMenuButton asChild isActive={item.href.includes(url)} tooltip={{ children: sub.title }}>
                    <Link href={sub.href} prefetch>
                      {sub.icon && <sub.icon />}
                      <span className="capitalize">{sub.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </DropdownMenuItem>
              ))
              : <DropdownMenuItem key={`${sub.title}-${sub.access}`}>
                <SidebarMenuButton asChild isActive={item.href.includes(url)} tooltip={{ children: sub.title }}>
                  <Link href={sub.href} prefetch>
                    {sub.icon && <sub.icon />}
                    <span className="capitalize">{sub.title}</span>
                  </Link>
                </SidebarMenuButton>
              </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
};

const SidebarMenuCollapsible = ({ item, url, user }: { item: NavCollapsible, url: string, user: User }) => {
  const { setOpenMobile } = useSidebar();
  return (
    <Collapsible asChild defaultOpen={item.href.includes(url)} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              subItem.access ? (
                subItem.access.split(',').map(a => (
                  a === user.role && (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild isActive={item.href.includes(url)}>
                        <Link href={subItem.href} prefetch onClick={() => setOpenMobile(false)}>
                          {subItem.icon && <subItem.icon />}
                          <span className="capitalize">{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )
                ))
              ) : (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild isActive={item.href.includes(url)}>
                    <Link href={subItem.href} prefetch onClick={() => setOpenMobile(false)}>
                      {subItem.icon && <subItem.icon />}
                      <span className="capitalize">{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              )
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}