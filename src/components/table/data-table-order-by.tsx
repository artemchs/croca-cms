"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateURLSearchParams } from "@/utils/miscellaneous/updateURLSearchParams";
import { type LabelValue } from "@/utils/types";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function DataTableOrderBy({ fields }: { fields: LabelValue[] }) {
  const [field, setField] = useState("");
  const [direction, setDirection] = useState<"asc" | "desc">();

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    const field = params.get("orderBy.field");
    const direction = params.get("orderBy.direction");

    if (field) {
      setField(field);
    }

    if (direction) {
      setDirection(direction as "asc" | "desc");
    }
  }, [searchParams]);

  function updateOrderByField(field: string) {
    setField(field);

    const updates: Record<string, string> = { "orderBy.field": field };
    if (!direction) {
      updates["orderBy.direction"] = "asc";
    }

    updateURLSearchParams(updates, searchParams);
  }

  function updateOrderByDirection(direction: "asc" | "desc") {
    setDirection(direction);

    updateURLSearchParams(
      {
        "orderBy.direction": direction,
      },
      searchParams,
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-8">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Сортировать по</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={field}
          onValueChange={updateOrderByField}
        >
          {fields.map((field) => (
            <DropdownMenuRadioItem key={field.value} value={field.value}>
              {field.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={direction}
          onValueChange={(value) =>
            updateOrderByDirection(value as "asc" | "desc")
          }
        >
          <DropdownMenuRadioItem value="asc">
            <ArrowUp className="mr-2 h-4 w-4" />
            A-Я
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">
            <ArrowDown className="mr-2 h-4 w-4" />
            Я-A
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
