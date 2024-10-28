import { SidebarTrigger } from "@/components/ui/sidebar";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center gap-2 border-b bg-sidebar px-4">
      <SidebarTrigger className="-ml-1" />
    </header>
  );
}
