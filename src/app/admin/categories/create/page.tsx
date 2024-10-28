import { EntityMutationLayout } from "../../_components/layouts/EntityMutationLayout";
import { CreateOneCategoryForm } from "./_components/CreateOneCategoryForm";

export default function Page() {
  return (
    <EntityMutationLayout
      title="Создать новую категорию"
      prevUrl="/admin/categories"
    >
      <CreateOneCategoryForm />
    </EntityMutationLayout>
  );
}
