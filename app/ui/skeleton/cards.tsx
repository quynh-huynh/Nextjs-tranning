import { CardSkeleton } from "./card";

export function CardsSkeleton() {
  return (
    <div className="flex flex-wrap justify-center">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
