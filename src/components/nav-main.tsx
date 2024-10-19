import type { NavItem } from "./app-sidebar";
import { SidebarMenuItemAdjustable } from "./sidebar-menu-item-adjustable";
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "./ui/sidebar";

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItemAdjustable item={item} key={item.title} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
