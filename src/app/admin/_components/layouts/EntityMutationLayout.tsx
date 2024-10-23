import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function EntityMutationLayout({
  title,
  prevUrl,
  children,
}: {
  title: string;
  prevUrl: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full justify-center p-6">
      <div className="flex max-w-screen-lg grow flex-col gap-6">
        <div className="flex w-full items-center gap-2">
          <Button asChild className="h-8 w-8" variant="ghost">
            <Link href={prevUrl}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
