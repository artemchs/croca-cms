import { DataTable } from "@/components/table/data-table";
import { type LabelValue } from "@/utils/types";
import { type ColumnDef } from "@tanstack/react-table";

interface EntityListLayoutProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
  topBarActions?: React.ReactNode;
  count: number;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  orderByFields?: LabelValue[];
}

export function EntityListLayout<TData, TValue>({
  columns,
  data,
  title,
  topBarActions,
  count,
  errorMessage,
  isError,
  isLoading,
  orderByFields,
}: EntityListLayoutProps<TData, TValue>) {
  return (
    <div className="flex h-full w-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex items-center gap-2">{topBarActions}</div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        count={count}
        errorMessage={errorMessage}
        isError={isError}
        isLoading={isLoading}
        orderByFields={orderByFields}
      />
    </div>
  );
}
