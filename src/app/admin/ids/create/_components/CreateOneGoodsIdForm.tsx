"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/trpc/react";
import {
  type CreateOneIdInput,
  createOneIdSchema,
} from "@/utils/validation/ids/createOneId";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GoodsIdFormFields } from "../../_components/form/GoodsIdFormFields";

export function CreateOneGoodsIdForm() {
  const router = useRouter();
  const apiUtils = api.useUtils();

  const form = useForm<CreateOneIdInput>({
    resolver: zodResolver(createOneIdSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = api.ids.createOne.useMutation({
    async onSuccess() {
      router.push("/admin/ids");
      toast.success("Идентификатор успешно создан");
      await Promise.all([apiUtils.ids.readMany.invalidate()]);
    },
    onError({ message }) {
      toast.error(message);
    },
  });

  function onSubmit(values: CreateOneIdInput) {
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
          <Plus className="h-4 w-4" />
        )}
        Создать
      </Button>
    </div>
  );
}
