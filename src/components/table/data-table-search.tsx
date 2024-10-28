import { updateURLSearchParams } from "@/utils/miscellaneous/updateURLSearchParams";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export function DataTableSearch() {
  const [query, setQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    const query = params.get("query");

    if (query) {
      setQuery(query);
    }
  }, [searchParams]);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      updateURLSearchParams(
        {
          query,
        },
        searchParams,
      );
    }, 500); // delay in milliseconds

    setTimeoutId(id);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchParams]);

  function updateQuery(query: string) {
    setQuery(query);
  }

  return (
    <Input
      startIcon={Search}
      className="h-8 w-full bg-secondary"
      placeholder="Поиск..."
      autoFocus
      value={query}
      onChange={(e) => updateQuery(e.target.value)}
    />
  );
}
