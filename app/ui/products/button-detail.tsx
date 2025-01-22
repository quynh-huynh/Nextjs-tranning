"use client";

import { useRouter } from "next/navigation";
import { Button } from "../components/button";

export function DetailProduct({ id }: { id: string }) {
  const router = useRouter();
  return (
    <Button onClick={() => router.push(`/products/${id}`)}>View full</Button>
  );
}
