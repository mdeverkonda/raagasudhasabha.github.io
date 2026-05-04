import type { MetadataRoute } from "next";

const SITE_URL = "https://www.raagasudhasabha.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ["", "/events", "/about", "/archive", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/events" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
