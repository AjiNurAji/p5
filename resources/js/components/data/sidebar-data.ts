import { NavItem, SidebarData } from '@/types';
import { BookOpen, Folder, LayoutGrid, ListTodo, ReceiptText, UsersRound } from 'lucide-react';

export const sidebarData: SidebarData = {
  navGroup: [
    {
      title: 'umum',
      items: [
        {
          title: 'dasbor',
          href: route('dashboard'),
          icon: LayoutGrid
        },
        {
          title: 'tugas',
          href: route('tasks.index'),
          icon: ListTodo
        },
        {
          title: 'kas',
          href: '/kas',
          icon: ReceiptText
        }
      ],
    },
    {
      title: 'pengguna',
      access: 'superadmin,admin',
      items: [
        {
          title: 'pengguna',
          icon: UsersRound,
          href: route('users.index'),
        }
      ]
    },
    {
      title: 'pendidikan',
      access: 'superadmin,admin',
      items: [
        {
          title: 'matkul',
          href: route('matkul.index'),
          icon: BookOpen
        }
      ]
    }
  ],
};

export const footerNavItems: NavItem[] = [
  {
    title: 'Pusat Data',
    href: '/repository',
    icon: Folder,
  },
];