import { NavItem, SidebarData } from "@/types";
import {
  BookOpen,
  Folder,
  History,
  LayoutGrid,
  ListTodo,
  ReceiptText,
  UsersRound,
} from "lucide-react";
import { IoWalletOutline } from "react-icons/io5";
import { PiInvoice, PiStudent } from "react-icons/pi";

export const sidebarData: SidebarData = {
  navGroup: [
    {
      title: "umum",
      items: [
        {
          title: "dasbor",
          href: route("dashboard"),
          icon: LayoutGrid,
        },
        {
          title: "tugas",
          href: route("tasks.index"),
          icon: ListTodo,
        },
        {
          title: "kas",
          href: route("kas.index"),
          icon: IoWalletOutline,
          items: [
            {
              access: ["superadmin", "bendahara", "kosma"],
              title: "kas",
              href: route("kas.index"),
              icon: ReceiptText,
            },
            {
              title: "Laporan Kas",
              href: route("kas.report"),
              icon: PiInvoice,
            },
            {
              title: "Riwayat Transaksi",
              href: route("kas.history"),
              icon: History,
            },
          ],
        },
      ],
    },
    {
      title: "pengguna",
      access: ["superadmin", "kosma", "wakosma"],
      items: [
        {
          title: "mahasiswa",
          icon: UsersRound,
          href: route("users.index"),
        },
      ],
    },
    {
      title: "pendidikan",
      access: ["superadmin", "kosma", "wakosma", "sekertaris"],
      items: [
        {
          title: "matkul",
          href: route("matkul.index"),
          icon: BookOpen,
        },
        {
          title: "semester",
          href: route("semester.index"),
          icon: PiStudent,
        },
      ],
    },
  ],
};

export const footerNavItems: NavItem[] = [
  {
    title: "Pusat Data",
    href: "https://drive.google.com/drive/folders/1IS39gpK2-QJoNEAaIdICrYeUCk2SuLP-?usp=sharing",
    icon: Folder,
  },
];
