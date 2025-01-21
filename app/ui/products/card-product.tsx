import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/card";

import Image from "next/image";
import { Button } from "../components/button";

export function CardProduct() {
  return (
    <Card className="w-[250px] h-[350px] m-[10px] flex flex-col items-center justify-between p-2 border border-gray-300 rounded-md shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-sm font-semibold">Product Name</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Image
          src="/opengraph-image.png"
          alt="Product image"
          width={200}
          height={200}
          className="rounded-md"
        />
      </CardContent>
      <CardFooter className="text-xs text-gray-500 flex justify-between">
        <Button variant="secondary" className="w-[100px]">Secondary</Button>
        <Button className="m-2 w-[100px]">Button</Button>
      </CardFooter>
    </Card>
  );
}
