import { api } from "@/trpc/server";
import { EntityMutationLayout } from "../../_components/layouts/EntityMutationLayout";
import { UpdateOneGoodsIdForm } from "./_components/UpdateOneGoodsIdForm";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await api.ids.readOne({
    id: params.id,
  });

  return (
    <EntityMutationLayout
      title="Редактировать идентификатор"
      prevUrl="/admin/ids"
    >
      <UpdateOneGoodsIdForm data={data} />
    </EntityMutationLayout>
  );
}
