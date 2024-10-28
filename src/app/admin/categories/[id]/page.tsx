import { api } from "@/trpc/server";
import { EntityMutationLayout } from "../../_components/layouts/EntityMutationLayout";
import { UpdateOneCategoryForm } from "./_components/UpdateOneCategoryForm";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await api.categories.readOne({
    id: params.id,
  });

  return (
    <EntityMutationLayout
      title="Редактировать категорию"
      prevUrl="/admin/categories"
    >
      <UpdateOneCategoryForm data={data} />
    </EntityMutationLayout>
  );
}
