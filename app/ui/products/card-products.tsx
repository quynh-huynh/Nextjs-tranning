import { Product } from "@/app/lib/models/product";
import { CardProduct } from "./card-product";

export default async function CardProducts({
  products
}: {
  products: Product[]
}) {

  return (
    <div className="flex flex-wrap justify-center">
      {products?.map((product: Product) => (
        <CardProduct product={product} />
      ))}
    </div>
  );
}
