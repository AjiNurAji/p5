import { Shield, UserRound, UserRoundCog, UserRoundPen, UserSquare, UsersRound } from "lucide-react";


export const userTypes = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: Shield,
  },
  {
    label: 'Kosma',
    value: 'kosma',
    icon: UserSquare,
  },
  {
    label: 'Wakil Kosma',
    value: 'wakosma',
    icon: UsersRound,
  },
  {
    label: 'Bendahara',
    value: 'bendahara',
    icon: UserRoundCog,
  },
  {
    label: 'Sekertaris',
    value: 'sekertaris',
    icon: UserRoundPen,
  },
  {
    label: 'Member',
    value: 'member',
    icon: UserRound,
  },
] as const
