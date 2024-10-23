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

export function DeleteOneGoodsIdCredenza({
  id,
  trigger,
}: {
  id: string;
  trigger: React.ReactNode;
}) {
  const [isOpened, setIsOpened] = useState(false);
  const { data, isLoading, error, isError } = api.ids.readOne.useQuery({ id });

  const { mutateAsync } = api.ids.deleteOne.useMutation();

  return (
    <Credenza open={isOpened} onOpenChange={setIsOpened}>
      <CredenzaTrigger asChild>{trigger}</CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Удалить идентификатор</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          {isError ? (
            <>{error.message}</>
          ) : isLoading ? (
            <LoadingBody />
          ) : (
            <>
              Вы уверены, что хотите удалить идентификатор &quot;{data?.name}
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
                success: "Идентификатор успешно удален",
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
