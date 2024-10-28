"use client";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateURLSearchParams } from "@/utils/miscellaneous/updateURLSearchParams";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";

export function DataTablePagination({ count }: { count: number }) {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE);

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    const page = params.get("page");
    const limit = params.get("limit");

    if (page) {
      setPage(Number(page));
    }

    if (limit) {
      setLimit(Number(limit));
    }
  }, [searchParams]);

  function updatePage(page: number) {
    setPage(page);

    updateURLSearchParams(
      {
        page: String(page),
      },
      searchParams,
    );
  }

  function updateLimit(limit: number) {
    setLimit(limit);

    updateURLSearchParams(
      {
        limit: String(limit),
      },
      searchParams,
    );
  }

  return (
    <>
      <LimitSelect limit={limit} updateLimit={updateLimit} />
      <Pagination
        page={page}
        updatePage={updatePage}
        limit={limit}
        count={count}
      />
    </>
  );
}

function LimitSelect({
  limit,
  updateLimit,
}: {
  limit: number;
  updateLimit: (limit: number) => void;
}) {
  return (
    <Select
      value={limit.toString()}
      onValueChange={(value) => updateLimit(parseInt(value))}
    >
      <SelectTrigger className="h-8 w-20 bg-background">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start">
        <SelectItem value="25">25</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
        <SelectItem value="250">250</SelectItem>
        <SelectItem value="500">500</SelectItem>
      </SelectContent>
    </Select>
  );
}

function Pagination({
  page,
  count,
  limit,
  updatePage,
}: {
  page: number;
  count: number;
  limit: number;
  updatePage: (page: number) => void;
}) {
  const [numberOfPages, setNumberOfPages] = useState(
    getNumberOfPages(count, limit),
  );

  useEffect(() => {
    setNumberOfPages(getNumberOfPages(count, limit));
  }, [count, limit]);

  const handleBack = () => {
    if (page === 1) return;

    updatePage(page - 1);
  };

  const handleForward = () => {
    if (page === numberOfPages) return;

    updatePage(page + 1);
  };

  const handleFirst = () => {
    updatePage(1);
  };

  const handleLast = () => {
    updatePage(numberOfPages);
  };

  return (
    <div className="flex items-center gap-4">
      <span>
        {page} из {numberOfPages} страниц ({count} записей)
      </span>
      <div className="flex items-center gap-2">
        <Button className="h-8 w-8" variant="outline" onClick={handleFirst}>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button className="h-8 w-8" variant="outline" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button className="h-8 w-8" variant="outline" onClick={handleForward}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button className="h-8 w-8" variant="outline" onClick={handleLast}>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function getNumberOfPages(count: number, limit: number) {
  return Math.ceil(count / limit);
}
