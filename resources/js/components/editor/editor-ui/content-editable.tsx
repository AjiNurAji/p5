import { cn } from "@/lib/utils";
import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable";
import { JSX } from "react";

type Props = {
  placeholder: string;
  className?: string;
  placeholderClassName?: string;
};

export function ContentEditable({
  placeholder,
  className,
  placeholderClassName,
}: Props): JSX.Element {
  return (
    <LexicalContentEditable
      className={cn(
        `ContentEditable__root relative block min-h-40 overflow-auto px-8 py-4 focus:outline-none`,
        className,
      )}
      id="task"
      aria-placeholder={placeholder}
      placeholder={
        <div
          className={cn(
            "pointer-events-none absolute top-0 left-0 overflow-hidden px-8 py-[18px] text-ellipsis text-muted-foreground select-none",
            placeholderClassName,
          )}
        >
          {placeholder}
        </div>
      }
    />
  );
}
