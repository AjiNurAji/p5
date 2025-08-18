import {
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  QuoteIcon,
  TextIcon,
} from "lucide-react"

export const blockTypeToBlockName: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  paragraph: {
    label: "Paragraf",
    icon: <TextIcon className="size-4" />,
  },
  h1: {
    label: "Judul 1",
    icon: <Heading1Icon className="size-4" />,
  },
  h2: {
    label: "Judul 2",
    icon: <Heading2Icon className="size-4" />,
  },
  h3: {
    label: "Judul 3",
    icon: <Heading3Icon className="size-4" />,
  },
  h4: {
    label: "Judul 4",
    icon: <Heading4Icon className="size-4" />,
  },
  number: {
    label: "Numbered List",
    icon: <ListOrderedIcon className="size-4" />,
  },
  bullet: {
    label: "Bulleted List",
    icon: <ListIcon className="size-4" />,
  },
  check: {
    label: "Check List",
    icon: <ListTodoIcon className="size-4" />,
  },
  code: {
    label: "Code Block",
    icon: <CodeIcon className="size-4" />,
  },
  quote: {
    label: "Quote",
    icon: <QuoteIcon className="size-4" />,
  },
}
