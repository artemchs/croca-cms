"use client";

import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteOneCategoryCredenza({
  id,
  trigger,
}: {
  id: string;
  trigger: React.ReactNode;
}) {
  const apiUtils = api.useUtils();

  const [isOpened, setIsOpened] = useState(false);
  const { data, isLoading, error, isError } = api.categories.readOne.useQuery({
    id,
  });

  const { mutateAsync } = api.categories.deleteOne.useMutation({
    async onSuccess() {
      await apiUtils.categories.readMany.invalidate();
    },
  });

  return (
    <Credenza open={isOpened} onOpenChange={setIsOpened}>
      <CredenzaTrigger asChild>{trigger}</CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Удалить категорию</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          {isError ? (
            <>{error.message}</>
          ) : isLoading ? (
            <LoadingBody />
          ) : (
            <>
              Вы уверены, что хотите удалить категорию &quot;{data?.name}
              &quot;?
            </>
          )}
        </CredenzaBody>
        <CredenzaFooter>
          <Button variant="secondary" onClick={() => setIsOpened(false)}>
            Отменить
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading || isError}
            onClick={() => {
              setIsOpened(false);
              toast.promise(mutateAsync({ id }), {
                loading: "Удаление...",
                success: "Категория успешно удалена",
                error: "Ошибка при удалении",
              });
            }}
          >
            <Trash2 className="h-4 w-4" />
            Удалить
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}

function LoadingBody() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
