import Search from "@/app/ui/products/search";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { Metadata } from "next";
import { CardsSkeleton } from "@/app/ui/skeleton/cards";
import CardProducts from "@/app/ui/products/card-products";
import { PageRequest } from "@/app/lib/models/product";
import { PaginationFullButton } from "@/app/ui/components/pagination/pagination-full-button";
import { fetchProductsByTenandId } from "@/app/lib/apis/api-tenant-product";

export const metadata: Metadata = {
  title: "Product",
};

export default async function Page(props: {
  searchParams?: Promise<{
    tenandId?: string;
    pageIndex?: string;
    pageSize?: string;
    sortExpression: string;
    searchTerm?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  
  const pageRequest: PageRequest = {
    pageIndex: isNaN(Number(searchParams?.pageIndex))
      ? 0
      : Number(searchParams?.pageIndex), // Default to 1 if conversion fails
    pageSize: isNaN(Number(searchParams?.pageSize))
      ? 10
      : Number(searchParams?.pageSize),
    sortExpression: searchParams?.sortExpression || "",
    searchTerm: searchParams?.searchTerm || ""
  };

  const products = await fetchProductsByTenandId(pageRequest);

  return (
    <div className="w-full ml-20 mr-20">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search by text ..." />
      </div>

      <Suspense fallback={<CardsSkeleton />}>
        <CardProducts products={products?.items} />
      </Suspense>

      <PaginationFullButton
        pageSize={pageRequest.pageSize}
        pageIndex={pageRequest.pageIndex}
        totalItems={products.totalCount}
      />
    </div>
  );
}
