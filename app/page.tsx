import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
    <Link href="/products">
      <p className="text-lg font-semibold">Products</p>
    </Link>
  </main>
  );
}
