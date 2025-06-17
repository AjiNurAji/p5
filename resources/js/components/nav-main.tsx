import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar";
import type { NavCollapsible, NavGroup, NavLink, SharedData } from "@/types";
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
                  if (!item.items) return <SidebarMenuLink key={key} item={item} url={url} />;

                  if (state === "collapsed") return <SidebarMenuCollapsedDropdown key={key} item={item} url={url} />;

                  return <SidebarMenuCollapsible key={key} item={item} url={url} />;
                }
              })
            )
          }
          else {
            const key = `${item.title}-${item.access}`;
            if (!item.items) return <SidebarMenuLink key={key} item={item} url={url} />;

            if (state === "collapsed") return <SidebarMenuCollapsedDropdown key={key} item={item} url={url} />;

            return <SidebarMenuCollapsible key={key} item={item} url={url} />;
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
const SidebarMenuLink = ({ item, url }: { item: NavLink, url: string }) => {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={url.startsWith(item.href ?? '')} tooltip={{ children: item.title }}>
        <Link href={item.href ?? ''} prefetch onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span className="capitalize">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
};

const SidebarMenuCollapsedDropdown = ({ item, url }: { item: NavCollapsible, url: string }) => {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton isActive={url.startsWith(item.href)} tooltip={{ children: item.title }}>
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
            <DropdownMenuItem key={`${sub.title}-${sub.access}`}>
              <SidebarMenuButton asChild isActive={url.startsWith(sub.href)} tooltip={{ children: sub.title }}>
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

const SidebarMenuCollapsible = ({ item, url }: { item: NavCollapsible, url: string }) => {
  const { setOpenMobile } = useSidebar();
  return (
    <Collapsible asChild defaultOpen={url.startsWith(item.href)} className="group/collapsible">
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
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild isActive={url.startsWith(subItem.href)}>
                  <Link href={subItem.href} prefetch onClick={() => setOpenMobile(false)}>
                    {subItem.icon && <subItem.icon />}
                    <span className="capitalize">{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
};

// const MenuAccess = ({ item, url, user }: { item: NavGroup, url: string, user: User }) => (
//   <SidebarGroup className="px-2 py-0">
//     <SidebarGroupLabel className='capitalize'>{item.title}</SidebarGroupLabel>
//     <SidebarMenu>
//       {item.items.map((i) => (
//         i.access ? i.access?.split(',').map((a) => (
//           a === user.role && (
//             <SidebarMenuItem key={i.title}>
//               <SidebarMenuButton asChild isActive={url.startsWith(i.href)} tooltip={{ children: i.title }}>
//                 <Link href={i.href} prefetch>
//                   {i.icon && <i.icon />}
//                   <span className='capitalize'>{i.title}</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ))) : (
//           <SidebarMenuItem key={i.title}>
//             <SidebarMenuButton asChild isActive={url.startsWith(i.href)} tooltip={{ children: i.title }}>
//               <Link href={i.href} prefetch>
//                 {i.icon && <i.icon />}
//                 <span className='capitalize'>{i.title}</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         )
//       ))}
//     </SidebarMenu>
//   </SidebarGroup>
// )
