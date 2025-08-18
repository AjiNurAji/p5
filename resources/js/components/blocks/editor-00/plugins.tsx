import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useState } from "react";

import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { AutoLinkPlugin } from "@/components/editor/plugins/auto-link-plugin";
import { FloatingLinkEditorPlugin } from "@/components/editor/plugins/floating-link-editor-plugin";
import { LinkPlugin } from "@/components/editor/plugins/link-plugin";
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { LinkToolbarPlugin } from "@/components/editor/plugins/toolbar/link-toolbar-plugin";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const fontFormat: Array<{ format: string; tooltip: string }> = [
    { format: "bold", tooltip: "Tebal" },
    { format: "italic", tooltip: "Miring" },
    { format: "underline", tooltip: "Garis Bawah" },
    { format: "strikethrough", tooltip: "Coret" },
  ];

  return (
    <div className="relative">
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="vertical-align-middle sticky top-0 z-10 mb-2 flex gap-2 overflow-auto rounded-md border border-b border-border bg-card p-2">
            {fontFormat.map(({ format, tooltip }, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <div>
                    <FontFormatToolbarPlugin format={format} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
              </Tooltip>
            ))}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <LinkToolbarPlugin />
                </div>
              </TooltipTrigger>
              <TooltipContent>Link</TooltipContent>
            </Tooltip>
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={["h1", "h2", "h3", "h4"]} />
              <FormatNumberedList />
              <FormatBulletedList />
              <FormatQuote />
            </BlockFormatDropDown>
          </div>
        )}
      </ToolbarPlugin>

      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable
                  placeholderClassName="px-4 py-3"
                  className="h-auto w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
                  placeholder={"Ketik tugas..."}
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* editor plugins */}
        <ClickableLinkPlugin />
        <AutoLinkPlugin />
        <LinkPlugin />
        <ListPlugin />

        <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
      </div>
      {/* actions plugins */}
    </div>
  );
}
