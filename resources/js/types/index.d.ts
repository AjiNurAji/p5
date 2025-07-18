import type { Config } from 'ziggy-js';

export interface Auth {
	user: User;
}

export interface BreadcrumbItem {
	title: string;
	href: string;
}

interface BaseNavItem {
	title: string;
	icon?: LucideIcon | null;
  access?: string;
}

export type NavLink = BaseNavItem & {
	href: string;
	items?: never;
}

export type NavCollapsible = BaseNavItem & {
	items: (BaseNavItem & { href: string })[];
  href: string;
};

export type NavItem = NavCollapsible | NavLink;

export interface NavGroup {
	title: string;
  access?: string;
	items: NavItem[],
}

export interface SidebarData {
	navGroup: NavGroup[];
}

export interface SharedData {
	name: string;
	quote: { message: string; author: string };
	auth: Auth;
	ziggy: Config & { location: string };
	sidebarOpen: boolean;
	[key: string]: unknown;
}

export interface User {
	id_number: string;
	name: string;
	email: string;
	role: string;
	avatar?: string;
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
	[key: string]: unknown; // This allows for additional properties...
}

export interface Matkul {
  id_matkul: string;
  name: string;
  semester: number;
  lecturer: string;
}

export interface Task {
  id_task: string;
  task: string;
  id_matkul: string;
  deadline: Date;
}

export type TaskType = {
  id_task: string;
  task: string;
  deadline: Date;
  matkul: Matkul;
}

export interface Kas {
  id_kas: string;
  id_number: string;
  user: User;
  nominal: number;
  payment_on: Date;
  method: "cash" | "cashless";
}