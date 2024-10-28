"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api, type RouterOutputs } from "@/trpc/react";
import { type UpdateOneCategoryInput } from "@/utils/validation/categories/updateOneCategory";
import { Edit2, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CategoryFormFields } from "../../_components/form/CategoryFormFields";
import { useRouter } from "next/navigation";

export function UpdateOneCategoryForm({
  data,
}: {
  data: RouterOutputs["categories"]["readOne"];
}) {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const form = useForm<UpdateOneCategoryInput>({
    defaultValues: {
      id: data.id,
      name: data.name,
      description: data.description ?? "",
    },
  });

  const { mutate, isPending } = api.categories.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.categories.readOne.invalidate({ id: data.id }),
        apiUtils.categories.readMany.invalidate(),
      ]);
      router.push("/admin/categories");
    },
    onError({ message }) {
      toast.error(message);
    },
  });

  function onSubmit(values: UpdateOneCategoryInput) {
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
          <Edit2 className="h-2 w-2" />
        )}
        Сохранить
      </Button>
    </div>
  );
}
