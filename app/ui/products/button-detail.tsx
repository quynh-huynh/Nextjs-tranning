"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function DetailProduct({ customId }: { customId: number }) {
  const router = useRouter();
  return (
  <Button onClick={() => router.push(`/products/${customId}`)}>View full</Button>
  );
}
