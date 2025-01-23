import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Product } from "@/app/lib/models/product";
import { format } from "path";
import { formatCurrency } from "@/app/lib/number";

export async function QuickviewButton({ product }: { product: Product }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Quickview</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
          <DialogDescription>
            Detailed view of the product.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2 overflow-y-auto">
          <div>
            <img src={product.imageUrl} alt={product.title} className="w-full h-[200px] object-cover" />
          </div>
          <div>
            <Label>Price:</Label>
            <p>{formatCurrency(product.price)}</p>
          </div>
          <div>
            <Label>Regular Price:</Label>
            <p>{formatCurrency(product.regularPrice)}</p>
          </div>
          <div>
            <Label>Total Reviews:</Label>
            <p>{product.totalReviews}</p>
          </div>
          <div>
            <Label>Review Stat Five Scale:</Label>
            <p>{product.reviewStatFiveScale}</p>
          </div>
          <div>
            <Label>Brand Name:</Label>
            <p>{product.brandName}</p>
          </div>
         
          <div>
            <ul>
              {product.attributeGroups.map((group) => (
                <li key={group.id}>
                  <strong>{group.name}</strong>
                  <ul>
                    {group.attributes.map((attr) => (
                      <li key={attr.id}>
                        {attr.name}: {attr.value}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter className="flex justify-center">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
