import { EntityMutationLayout } from "../../_components/layouts/EntityMutationLayout";
import { CreateOneGoodsIdForm } from "./_components/CreateOneGoodsIdForm";

export default function Page() {
  return (
    <EntityMutationLayout
      title="Создать новый идентификатор"
      prevUrl="/admin/ids"
    >
      <CreateOneGoodsIdForm />
    </EntityMutationLayout>
  );
}
