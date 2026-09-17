import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { rupiah } from "@/lib/utils";
import Buy from "@/components/Buy";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({ where: { slug } });

  return p
    ? {
        title: p.seoTitle || p.name,
        description: p.seoDesc || p.description,
        alternates: { canonical: `/product/${slug}` },
      }
    : {};
}

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({
    where: { slug, active: true },
    include: {
      variants: true,
      images: true,
      category: true,
    },
  });

  if (!p) notFound();

  return (
    <main className="container py-10">
      <Link href="/shop" className="underline">
        ← SHOP
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div>
          <Image
            src={p.thumbnail}
            alt={`${p.name} Ravenka`}
            width={900}
            height={1100}
            className="w-full"
          />
        </div>

        <div>
          <p className="text-xs font-bold tracking-[.3em]">
            {p.category?.name}
          </p>
          <h1 className="text-5xl font-black mt-3">{p.name}</h1>
          <b className="text-3xl block mt-5">{rupiah(p.basePrice)}</b>
          <p className="mt-6 leading-7 text-neutral-600">{p.description}</p>

          <Buy
            product={{
              id: p.id,
              name: p.name,
              thumbnail: p.thumbnail,
              basePrice: p.basePrice,
              weight: p.weight,
              variants: p.variants,
            }}
          />
        </div>
      </div>
    </main>
  );
}
