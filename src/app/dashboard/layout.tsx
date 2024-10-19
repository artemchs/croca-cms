import Navbar from "./_components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100dvh] w-[100dvw] flex-col bg-secondary lg:flex-row">
      <Navbar />
      {children}
    </div>
  );
}
