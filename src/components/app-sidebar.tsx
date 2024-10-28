"use client";

import {
  Home,
  IdCard,
  Images,
  Layers,
  LucideGrid2X2,
  type LucideIcon,
  ShoppingBasket,
  SlidersHorizontal,
  Tags,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { type Session } from "next-auth";
import { NavMain } from "./nav-main";

export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  items:
    | {
        title: string;
        url: string;
      }[]
    | null;
};

const data = {
  main: [
    {
      url: "/admin",
      title: "Главная",
      icon: Home,
      items: null,
    },
    {
      url: "/admin/categories",
      title: "Категории",
      icon: Layers,
      items: null,
    },
    {
      url: "/admin/goods",
      title: "Товары",
      icon: ShoppingBasket,
      items: null,
    },
    {
      url: "/admin/ids",
      title: "Идентификаторы",
      icon: IdCard,
      items: null,
    },
    {
      url: "/admin/attributes",
      title: "Атрибуты",
      icon: LucideGrid2X2,
      items: null,
    },
    {
      url: "/admin/characteristics",
      title: "Характеристики",
      icon: SlidersHorizontal,
      items: null,
    },
    {
      url: "/admin/tags",
      title: "Теги",
      icon: Tags,
      items: null,
    },
    {
      url: "/admin/media",
      title: "Медиа",
      icon: Images,
      items: null,
    },
  ],
};

export function AppSidebar({ session }: { session: Session }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={data.main} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
