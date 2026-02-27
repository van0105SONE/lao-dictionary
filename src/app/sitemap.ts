import { MetadataRoute } from "next";
import { db } from "@/db/drizzle";
import { dictionary } from "@/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://www.laoswords.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/correct-incorrect`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/aboutus`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic word routes – fetch all words from DB
  let wordRoutes: MetadataRoute.Sitemap = [];
  try {
    const words = await db.select({ word: dictionary.word }).from(dictionary);
    wordRoutes = words.map((row) => ({
      url: `${BASE_URL}/${encodeURIComponent(row.word)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Sitemap: failed to fetch words from DB", error);
  }

  return [...staticRoutes, ...wordRoutes];
}
