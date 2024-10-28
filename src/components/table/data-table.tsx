"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListFilter, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { DataTableOrderBy } from "./data-table-order-by";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableSearch } from "./data-table-search";
import { type LabelValue } from "@/utils/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  count: number;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  orderByFields?: LabelValue[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  count,
  errorMessage,
  isError,
  isLoading,
  orderByFields,
}: DataTableProps<TData, TValue>) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex h-full w-full rounded-md border border-input bg-background shadow-sm">
      <div className="relative flex h-full w-full flex-col">
        <div className="flex items-center justify-between gap-4 p-4">
          {isFilterOpen ? <DataTableSearch /> : <div>asdf</div>}
          <div className="flex items-center gap-2">
            {isFilterOpen ? (
              <Button
                variant="ghost"
                className="h-8"
                onClick={() => setIsFilterOpen(false)}
              >
                Отменить
              </Button>
            ) : (
              <Button
                className="h-8 w-16"
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
              >
                <Search className="h-4 w-4" />
                <ListFilter className="h-4 w-4" />
              </Button>
            )}
            <DataTableOrderBy fields={orderByFields ?? []} />
          </div>
        </div>
        {isFilterOpen && <div className="border-t border-input p-4"></div>}
        <Table className="border-t border-input">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton key={column.id} className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {errorMessage}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нет результатов.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter className="rounded-b-md">
            <TableRow className="hover:bg-background/50">
              <TableCell colSpan={columns.length}>
                <div className="flex h-full w-full items-center justify-between text-muted-foreground">
                  <DataTablePagination count={count} />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
