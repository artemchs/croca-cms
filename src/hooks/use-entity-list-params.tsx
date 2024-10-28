import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/constants";

export function useEntityListParams() {
  const searchParams = useSearchParams();

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE);
  const [query, setQuery] = useState("");
  const [orderBy, setOrderBy] = useState({
    field: "createdAt",
    direction: "desc" as "asc" | "desc",
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    const page = params.get("page");
    const limit = params.get("limit");
    const query = params.get("query");
    const orderByField = params.get("orderBy.field");
    const orderByDirection = params.get("orderBy.direction");

    setPage(Number(page ?? DEFAULT_PAGE));
    setLimit(Number(limit ?? DEFAULT_PAGE_SIZE));
    setQuery(query ?? "");
    if (orderByField && orderByDirection) {
      setOrderBy({
        field: orderByField,
        direction: orderByDirection as "asc" | "desc",
      });
    }
  }, [searchParams]);

  return { page, limit, query, orderBy };
}
