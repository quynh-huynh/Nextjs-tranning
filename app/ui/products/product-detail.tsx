"use client";

import { fetchProductById } from "@/app/lib/apis/api-tenant-product";
import { Images } from "./images";
import { formatCurrency } from "@/app/lib/number";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  AttributeGroup,
  ProductDetail,
  Variant,
} from "@/app/lib/models/product";
import OrderPopup from "../order/order-popup";
import { useToast } from "@/hooks/use-toast";


export function ProductDetailView({ customId }: { customId: string }) {
  const [selectedAttributeId, setSelectedAttributeId] = useState<string | null>(
    null
  );
  const [selectedVariant, setSelectedVariantId] = useState<Variant>();
  const [productDetail, setProductDetail] = useState<ProductDetail>();
  const [price, setPrice] = useState<number>(0);

  const [variants, setVariants] = useState<Variant[]>([]);
  const [variantGroup, setVariantGroup] = useState<AttributeGroup[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await fetchProductById(customId);
      setProductDetail(product);
      setVariants(product.variants);
      setVariantGroup(product.attributeGroups);
    };

    fetchProduct();
  }, [customId]);

  if (!productDetail) return <div>Loading...</div>;

  const handleClick = (attributeId: string) => {
    setSelectedAttributeId(attributeId);
    const variant = variants.find((v: Variant) =>
      v.attributeGroups.some((group: AttributeGroup) =>
        group.attributes.some((attr) => attr.id === attributeId)
      )
    );

    setPrice(variant ? variant.price : 0);
    setSelectedVariantId(variant);
  };

  const handleSave = (value: boolean) => {
    if (value) {
        console.log('toast');
       toast({
      description: `Successfully ordered`
    })
    }
  }

  return (
    <div className="flex flex-col gap-10 m-4 items-center">
      <div className="flex w-full">
        <div className="flex-shrink-0 w-1/2 mr-24 h-full">
          <Images
            imagesUrl={productDetail.images.map((image) => image.origin)}
          />
        </div>
        <div className="flex flex-col gap-4 w-1/2">
          <h1>{productDetail.title}</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Price: {formatCurrency(price)}</Label>
              <h2></h2>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Discription: </Label>
              <p>{productDetail.description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              {variantGroup.map((group) => (
                <div key={group.id}>
                  <Label>{group.name}:</Label>
                  {group.attributes.map((attributes) => (
                    <Button
                      key={attributes.id}
                      onClick={() => handleClick(attributes.id)}
                      className={
                        selectedAttributeId === attributes.id
                          ? "bg-blue-500 mr-2"
                          : "mr-2"
                      }
                    >
                      {attributes.name}
                    </Button>
                  ))}
                </div>
              ))}
            </div>

            {selectedVariant && (
              <div className="flex flex-col gap-4 w-1/2 justify-center items-center">
                <OrderPopup variant={selectedVariant} onSave={handleSave} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
