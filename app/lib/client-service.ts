"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function updateSearchParams(key: string, value: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  params.set(key, value);

  return `${pathname}?${params.toString()}`;
}
