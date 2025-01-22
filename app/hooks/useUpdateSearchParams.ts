import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUpdateSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParams = (
    name: string,
    value: string,
    resetPageIndex: boolean = true
  ) => {
    const params = new URLSearchParams(searchParams);
    if (resetPageIndex) {
      params.set("pageIndex", "0");
    }
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return updateSearchParams;
}
