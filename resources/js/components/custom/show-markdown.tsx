"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function ShowMarkdown({ markdown }: { markdown: string }) {

  return (
    <div className="prose prose-sm max-w-none prose-neutral lg:prose-lg dark:prose-invert prose-h1:mb-3 prose-a:text-destructive prose-li:m-0">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ ...props }) => <a {...props} target="_blank" />,
        }}
      >{`${markdown}`}</Markdown>
    </div>
  );
}
