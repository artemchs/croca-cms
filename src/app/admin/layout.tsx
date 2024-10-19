import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/Navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("auth/signin");
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session} />
      <main className="flex h-full w-full flex-col">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
