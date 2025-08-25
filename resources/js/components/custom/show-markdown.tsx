"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ShowMarkdown({ markdown }: { markdown: string }) {

  return (
    <div className="prose prose-sm max-w-none prose-neutral lg:prose-lg dark:prose-invert prose-h1:mb-3 prose-a:text-destructive prose-li:m-0">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => <a {...props} target="_blank" />,
        }}
      >{`${markdown}`}</Markdown>
    </div>
  );
}
