import { Breadcrumbs } from "@/components/breadcrumbs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserMenuContent } from "@/components/user-menu-content";
import { useInitials } from "@/hooks/use-initials";
import { getAccess } from "@/layouts/authorized-layout";
import { checkIsActive } from "@/lib/check-is-active";
import { cn } from "@/lib/utils";
import { type BreadcrumbItem, type NavItem, type SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Menu } from "lucide-react";
import AppLogo from "./app-logo";
import AppLogoIcon from "./app-logo-icon";
import AppearanceToggleDropdown from "./appearance-dropdown";
import { footerNavItems, sidebarData } from "./data/sidebar-data";
import { NavMain } from "./nav-main";
import { SidebarProvider } from "./ui/sidebar";

const activeItemStyles = "text-accent-foreground bg-accent";

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
  const page = usePage<SharedData>();
  const { auth } = page.props;

  const getInitials = useInitials();
  return (
    <>
      <div className="border-b border-sidebar-border/80">
        <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 h-[34px] w-[34px]"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation Menu
                </SheetDescription>
                <SheetHeader className="flex justify-start text-left">
                  <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                </SheetHeader>
                <SidebarProvider>
                  <div className="flex h-full flex-1 flex-col">
                    <div className="flex h-full flex-col justify-between text-sm">
                      <div className="flex flex-col space-y-4">
                        {sidebarData.navGroup.map((props) =>
                          props.access ? (
                            getAccess(auth.user.role, props.access) && (
                              <NavMain key={props.title} {...props} />
                            )
                          ) : (
                            <NavMain key={props.title} {...props} />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </SidebarProvider>
              </SheetContent>
            </Sheet>
          </div>

          <Link
            href="/dashboard"
            prefetch
            className="flex items-center space-x-2"
          >
            <AppLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
            <NavigationMenu
              className="flex h-full items-stretch"
              viewport={false}
            >
              <NavigationMenuList className="flex h-full items-stretch space-x-2">
                {sidebarData.navGroup.map((nav) =>
                  nav.access
                    ? getAccess(auth.user.role, nav.access) &&
                      nav.items.map((item, index) => (
                        <MenuItem key={index} item={item} url={page.url} />
                      ))
                    : nav.items.map((item, index) => (
                        <MenuItem key={index} item={item} url={page.url} />
                      )),
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="ml-auto flex items-center space-x-2">
            <div className="relative flex items-center space-x-1">
              <div className="hidden lg:flex">
                {footerNavItems.map((item) => (
                  <TooltipProvider key={item.title} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium text-accent-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          <span className="sr-only">{item.title}</span>
                          {item.icon && (
                            <item.icon className="size-5 opacity-80 group-hover:opacity-100" />
                          )}
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            <AppearanceToggleDropdown />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-10 rounded-full p-1">
                  <Avatar className="size-8 overflow-hidden rounded-full">
                    <AvatarImage
                      src={`/storage/${auth.user.avatar}`}
                      className="h-auto w-full object-cover"
                      alt={auth.user.name}
                    />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                      {getInitials(auth.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <UserMenuContent user={auth.user} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {breadcrumbs.length > 1 && (
        <div className="flex w-full border-b border-sidebar-border/70">
          <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </div>
      )}
    </>
  );
}

const MenuItem = ({ item, url }: { item: NavItem; url: string }) =>
  item.items ? (
    <DropdownMenuItem item={item} url={url} />
  ) : (
    <NavigationMenuItem className="relative flex h-full items-center">
      <Link
        href={item.href}
        className={cn(
          navigationMenuTriggerStyle(),
          checkIsActive(url, item.href) && activeItemStyles,
          "h-9 cursor-pointer px-3 capitalize",
        )}
      >
        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
        {item.title}
      </Link>
    </NavigationMenuItem>
  );

const DropdownMenuItem = ({ item, url }: { item: NavItem; url: string }) => {
  const {
    auth: { user },
  } = usePage<SharedData>().props;

  return (
    <NavigationMenuItem className="relative flex h-full items-center">
      <NavigationMenuTrigger
        className={cn(
          "capitalize",
          item.href.includes(url) && activeItemStyles,
        )}
      >
        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
        {item.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-4">
          <li className="grid gap-2">
            {item.items?.map((subItem, _) =>
              subItem.access ? (
                getAccess(user.role, subItem.access) && (
                  <NavigationMenuLink key={subItem.title} asChild>
                    <Link
                      href={subItem.href}
                      className={cn(
                        checkIsActive(url, subItem.href) && activeItemStyles,
                        "h-9 w-full cursor-pointer flex-row items-center justify-start px-3 capitalize",
                      )}
                    >
                      {subItem.icon && (
                        <subItem.icon className="mr-2 h-4 w-4" />
                      )}
                      {subItem.title}
                    </Link>
                  </NavigationMenuLink>
                )
              ) : (
                <NavigationMenuLink asChild key={subItem.title}>
                  <Link
                    href={subItem.href}
                    className={cn(
                      checkIsActive(url, subItem.href) && activeItemStyles,
                      "h-9 w-full cursor-pointer flex-row items-center justify-start px-3 capitalize",
                    )}
                  >
                    {subItem.icon && <subItem.icon className="mr-2 h-4 w-4" />}
                    {subItem.title}
                  </Link>
                </NavigationMenuLink>
              ),
            )}
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
