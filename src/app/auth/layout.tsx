export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center">
      {children}
    </main>
  );
}
