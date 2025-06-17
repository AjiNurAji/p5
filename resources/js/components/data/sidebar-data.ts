import { SidebarData } from '@/types';
import { BookOpen, LayoutGrid, ListTodo, ReceiptText, UserRoundPlus, UsersRound } from 'lucide-react';

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
          href: '/tasks',
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
      items: [
        {
          title: 'pengguna',
          icon: UsersRound,
          href: '/users',
        }
      ]
    },
    {
      title: 'pendidikan',
      items: [
        {
          title: 'matkul',
          href: '/matkul',
          icon: BookOpen
        }
      ]
    }
  ],
};
