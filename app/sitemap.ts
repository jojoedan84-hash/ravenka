import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const p = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true, updatedAt: true },
  });

  return [
    {
      url: "https://ravenka.life",
      lastModified: new Date(),
    },
    {
      url: "https://ravenka.life/shop",
      lastModified: new Date(),
    },
    ...p.map((x) => ({
      url: `https://ravenka.life/product/${x.slug}`,
      lastModified: x.updatedAt,
    })),
  ];
}
