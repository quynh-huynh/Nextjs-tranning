import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/app/lib/models/product";
import { formatCurrency } from "@/app/lib/number";
import { DetailProduct } from "./button-detail";
import { QuickviewButton } from "./button-quickview";

export function CardProduct({ product }: { product: Product }) {
  
  return (
    <Card className="w-[250px] h-[350px] m-[10px] flex flex-col items-center justify-between p-2 border border-gray-300 rounded-xl shadow-md">
      <CardHeader className="flex justify-center items-center overflow-visible h-[30%]">
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{formatCurrency(product.price)}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={100}
          height={200}
          className="w-full h-[150px] object-cover"
        />
      </CardContent>
      <CardFooter className="text-xs text-gray-500 flex justify-between">
        {/* <Button >Quickview</Button> */}
        <QuickviewButton product={product}/>
        <DetailProduct customId={product.customId}/>
      </CardFooter>
    </Card>
  );
}
