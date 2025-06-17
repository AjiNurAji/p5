import { type Layout } from "@/hooks/use-layout"
import { createContext } from "react";

export interface LayoutContextInterface {
  layout: Layout;
  setLayout: (l: Layout) => void;
}

export const LayoutContext = createContext<LayoutContextInterface | null>(null);