"use client";

import { type RouterOutputs } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { CategoriesTableActions } from "./categories-table-actions";

export const categoriesColumns: ColumnDef<
  RouterOutputs["categories"]["readMany"]["items"][number]
>[] = [
  {
    id: "name",
    header: () => <div>Название</div>,
    cell: ({ row: { original } }) => original.name,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Действия</div>,
    cell: ({ row: { original } }) => {
      return <CategoriesTableActions id={original.id} />;
    },
  },
];
