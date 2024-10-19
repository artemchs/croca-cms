import { SidebarTrigger } from "@/components/ui/sidebar";

export function Navbar() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b bg-secondary/40 px-4">
      <SidebarTrigger className="-ml-1" />
    </header>
  );
}
