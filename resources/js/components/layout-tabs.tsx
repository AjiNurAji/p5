import { Layout } from "@/hooks/use-layout";
import { LayoutContext, LayoutContextInterface } from "@/lib/contexts/layout-context";
import { cn } from "@/lib/utils";
import { LucideIcon, PanelLeft, PanelTop } from "lucide-react";
import React, { useContext } from "react";

export const LayoutToggleTab = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { layout, setLayout } = useContext(LayoutContext) as LayoutContextInterface;

  const tabs: { value: Layout, icon: LucideIcon, label: string }[] = [
    { value: 'sidebar', icon: PanelLeft, label: 'Sidebar' },
    { value: 'header', icon: PanelTop, label: 'Header' }
  ]

  return (
    <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800',
      className
    )} {...props}>
      {tabs.map(({ value, icon: Icon, label }) => (
        <button key={value} onClick={() => setLayout(value)}
          className={cn('flex items-center rounded-md px-3.5 py-1.5 transition-colors',
            layout === value
              ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
              : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60')}>
          <Icon className="-ml-1 h-4 w-4" />
          <span className="ml-1.5 text-sm">{label}</span>
        </button>
      ))}
    </div>
  )
}

