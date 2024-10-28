"use client";

import { Form } from "@/components/ui/form";
import { api } from "@/trpc/react";
import {
  type CreateOneCategoryInput,
  createOneCategorySchema,
} from "@/utils/validation/categories/createOneCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CategoryFormFields } from "../../_components/form/CategoryFormFields";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";

export function CreateOneCategoryForm() {
  const router = useRouter();
  const apiUtils = api.useUtils();

  const form = useForm<CreateOneCategoryInput>({
    resolver: zodResolver(createOneCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = api.categories.createOne.useMutation({
    async onSuccess() {
      router.push("/admin/categories");
      await Promise.all([apiUtils.categories.readMany.invalidate()]);
    },
    onError({ message }) {
      toast.error(message);
    },
  });

  function onSubmit(values: CreateOneCategoryInput) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <CategoryFormFields form={form} />
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
