"use client";

import { useEntityListParams } from "@/hooks/use-entity-list-params";
import { api } from "@/trpc/react";
import { EntityListLayout } from "../_components/layouts/EntityListLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { categoriesColumns } from "./_components/table/categories-columns";

export default function Page() {
  const { limit, orderBy, page, query } = useEntityListParams();

  const { data, isLoading, isError, error } = api.categories.readMany.useQuery({
    page,
    limit,
    search: query,
    orderBy: orderBy,
  });

  return (
    <>
      <EntityListLayout
        title="Категории"
        topBarActions={<TopBarActions />}
        data={data?.items ?? []}
        columns={categoriesColumns}
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
        <Link href="/admin/categories/create">Создать</Link>
      </Button>
    </>
  );
}
