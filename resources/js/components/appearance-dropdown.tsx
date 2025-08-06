import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppearance } from "@/hooks/use-appearance";
import { Tooltip } from "@radix-ui/react-tooltip";
import { Monitor, Moon, Sun } from "lucide-react";
import { HTMLAttributes } from "react";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function AppearanceToggleDropdown({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { appearance, updateAppearance } = useAppearance();

  const getCurrentIcon = () => {
    switch (appearance) {
      case "dark":
        return <Moon className="h-5 w-5" />;
      case "light":
        return <Sun className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <div className={className} {...props}>
      <DropdownMenu>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-md"
                  >
                  {getCurrentIcon()}
                  <span className="sr-only">Toggle theme</span>
                  <TooltipContent>
                    <p>Tema</p>
                  </TooltipContent>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => updateAppearance("light")}>
            <span className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Terang
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance("dark")}>
            <span className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Gelap
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance("system")}>
            <span className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Sistem
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
