import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { DeleteOneCategoryCredenza } from "../delete/DeleteOneCategoryCredenza";

export function CategoriesTableActions({ id }: { id: string }) {
  return (
    <div className="flex shrink items-center justify-end">
      <Button className="h-8 w-8" variant="ghost" asChild>
        <Link href={`/admin/categories/${id}`}>
          <Edit2 className="h-4 w-4" />
        </Link>
      </Button>
      <DeleteOneCategoryCredenza
        id={id}
        trigger={
          <Button className="h-8 w-8" variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />
    </div>
  );
}
