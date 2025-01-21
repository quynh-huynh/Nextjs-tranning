import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/card";

import Image from "next/image";
import { Button } from "@/app/ui/components/button";
import { Product } from "@/app/lib/models/product";
import { formatCurrency } from "@/app/lib/number";

export function CardProduct({ product }: { product: Product }) {
  
  return (
    <Card className="w-[250px] h-[350px] m-[10px] flex flex-col items-center justify-between p-2 border border-gray-300 rounded-xl shadow-md">
      <CardHeader className="flex justify-center items-center">
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{formatCurrency(product.price)}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={100}
          height={200}
          className="rounded-md"
        />
      </CardContent>
      <CardFooter className="text-xs text-gray-500 flex justify-between">
        <Button>Quickview</Button>
        <Button>View full</Button>
      </CardFooter>
    </Card>
  );
}
