"use client";

import {
  type CreateOneIdInput,
  createOneIdSchema,
} from "@/utils/validation/ids/createOneId";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { GoodsIdFormFields } from "../../_components/form/GoodsIdFormFields";
import { Loader, Plus } from "lucide-react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CreateOneGoodsIdForm() {
  const router = useRouter();

  const form = useForm<CreateOneIdInput>({
    resolver: zodResolver(createOneIdSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = api.ids.createOne.useMutation({
    onSuccess() {
      router.push("/admin/ids");
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
