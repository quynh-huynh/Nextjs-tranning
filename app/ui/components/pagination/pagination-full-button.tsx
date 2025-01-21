"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationFullButtonProps {
  totalItems: number;
  pageSize: number;
  pageIndex: number;
}

export function PaginationFullButton({
  totalItems,
  pageSize,
  pageIndex,
}: PaginationFullButtonProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleUpdatesSearchParamUrl = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  };
console.log(pageIndex);
  const [_pageIndex, setPageIndex] = useState(pageIndex + 1);
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPageIndex(page);
      handleUpdatesSearchParamUrl("pageIndex", page.toString());
    }
  };

  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= pageSize) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const start = Math.max(1, _pageIndex - 2);
      const end = Math.min(totalPages, _pageIndex + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  if (totalItems <= pageSize) return <div></div>;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(_pageIndex - 1);
            }}
            disabled={_pageIndex === 1}
          />
        </PaginationItem>

        {getPageNumbers().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === _pageIndex}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && _pageIndex < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(_pageIndex + 1);
            }}
            disabled={_pageIndex === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
