"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";
import { EntityListLayout } from "../_components/layouts/EntityListLayout";
import { goodsIdsColumns } from "./_components/table/goods-ids-columns";
import { useEntityListParams } from "@/hooks/use-entity-list-params";

export default function Page() {
  const { limit, orderBy, page, query } = useEntityListParams();

  const { data, isLoading, isError, error } = api.ids.readMany.useQuery({
    page,
    limit,
    search: query,
    orderBy: orderBy,
  });

  return (
    <>
      <EntityListLayout
        title="Идентификаторы"
        topBarActions={<TopBarActions />}
        data={data?.items ?? []}
        columns={goodsIdsColumns}
        count={data?.count ?? 0}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.message}
        orderByFields={[
          {
            label: "Название",
            value: "name",
          },
          {
            label: "Дата создания",
            value: "createdAt",
          },
        ]}
      />
    </>
  );
}

function TopBarActions() {
  return (
    <>
      <Button asChild size="sm">
        <Link href="/admin/ids/create">Создать</Link>
      </Button>
    </>
  );
}
