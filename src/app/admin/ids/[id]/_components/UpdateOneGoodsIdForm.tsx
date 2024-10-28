"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api, type RouterOutputs } from "@/trpc/react";
import {
  type UpdateOneIdInput,
  updateOneIdSchema,
} from "@/utils/validation/ids/updateOneId";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GoodsIdFormFields } from "../../_components/form/GoodsIdFormFields";

export function UpdateOneGoodsIdForm({
  data,
}: {
  data: RouterOutputs["ids"]["readOne"];
}) {
  const apiUtils = api.useUtils();

  const form = useForm<UpdateOneIdInput>({
    resolver: zodResolver(updateOneIdSchema),
    defaultValues: {
      id: data.id,
      name: data.name,
    },
  });

  const { mutate, isPending } = api.ids.updateOne.useMutation({
    async onSuccess() {
      toast.success("Идентификатор успешно обновлен");
      await Promise.all([
        apiUtils.ids.readOne.invalidate({ id: data.id }),
        apiUtils.ids.readMany.invalidate(),
      ]);
    },
    onError({ message }) {
      toast.error(message);
    },
  });

  function onSubmit(values: UpdateOneIdInput) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <GoodsIdFormFields form={form} />
        <ActionButtons isPending={isPending} />
      </form>
    </Form>
  );
}

function ActionButtons({ isPending }: { isPending: boolean }) {
  return (
    <div className="flex items-center gap-2 self-end">
      <Button type="button" variant="secondary">
        Отменить
      </Button>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Edit2 className="h-2 w-2" />
        )}
        Сохранить
      </Button>
    </div>
  );
}
