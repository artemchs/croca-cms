"use client";

import { useEntityListParams } from "@/hooks/use-entity-list-params";
import { api } from "@/trpc/react";

export default function Page() {
  const { limit, orderBy, page, query } = useEntityListParams();

  const {} = api.categories.

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
