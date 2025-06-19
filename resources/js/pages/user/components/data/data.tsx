import { Shield, UserRound, UserSquare } from "lucide-react";


export const userTypes = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: Shield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: UserSquare,
  },
  {
    label: 'Member',
    value: 'member',
    icon: UserRound,
  },
] as const
