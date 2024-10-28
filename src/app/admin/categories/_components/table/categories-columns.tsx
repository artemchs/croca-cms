"use client";

import { type RouterOutputs } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";

export const categoriesColumns: ColumnDef<
  RouterOutputs["categories"]["readMany"]["items"][number]
>[] = [
  {
    id: "name",
    header: () => "Название",
    cell: ({ row: { original } }) => original.name,
  },
];
