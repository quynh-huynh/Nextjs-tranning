"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { combo, Combobox } from "../components/combobox";
import { useUpdateSearchParams } from '@/app/hooks/useUpdateSearchParams';

const listSort: combo[] = [
  { label: "Giá thấp", value: "price_asc" },
  { label: "Giá cao", value: "price_desc" },
  { label: "Tilte A->Z", value: "title_asc" },
  { label: "Title Z->a", value: "title_desc" },
];

export default function Search({ placeholder }: { placeholder: string }) {
  const updateSearchParams = useUpdateSearchParams();

  const handleSearch = useDebouncedCallback((term) => {
    updateSearchParams("searchTerm", term);
  }, 300);

  const handleComboboxChange = (value: string) => {
    updateSearchParams("sortExpression", value);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0 gap-4 items-center">
      <div className="flex items-center">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-500" />
        <input
          className="peer block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={useSearchParams().get("searchTerm") || ''}
        />
      </div>
      <Combobox 
        source={listSort} 
        currentValue={useSearchParams().get("sortExpression") || ''} 
        onChange={handleComboboxChange}
        className="border border-gray-200 rounded-md text-sm" 
      />
    </div>
  );
}
