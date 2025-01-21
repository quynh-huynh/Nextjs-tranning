"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { combo, Combobox } from "../components/combobox";

const listSort: combo[] = [
  { label: "Giá thấp", value: "price_asc" },
  { label: "Giá cao", value: "price_desc" },
  { label: "Tilte A->Z", value: "title_asc" },
  { label: "Title Z->a", value: "title_desc" },
];

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleUpdatesSearchParamUrl = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageIndex", "1");
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term) => {
    handleUpdatesSearchParamUrl('query', term);
  }, 300);

  const handleComboboxChange = (value: string) => {
    handleUpdatesSearchParamUrl('sortExpression', value);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Combobox source={listSort} onChange={handleComboboxChange}/>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
