import Breadcrumbs from '@/app/ui/products/breadcrumbs';
import { ProductDetailView } from '@/app/ui/products/product-detail';
import React from 'react'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/products" },
          {
            label: "Detail",
            href: `/products/${id}`,
            active: true,
          },
        ]}
      />
      <ProductDetailView customId={id} />
    </main>
  );
}
