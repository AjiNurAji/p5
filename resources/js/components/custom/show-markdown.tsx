"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ShowMarkdown({ markdown }: { markdown: string }) {
  return (
      <div className="prose prose-neutral dark:prose-invert prose-sm prose-p:my-0 prose-h1:mb-3 prose-a:text-destructive prose-li:m-0 lg:prose-lg max-w-none">
        <Markdown remarkPlugins={[remarkGfm]} components={{
          a: ({node, ...props}) => (
            <a {...props} target="_blank" />
          )
        }}>{`${markdown}`}</Markdown>
      </div>
  );
}
