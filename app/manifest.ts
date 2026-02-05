import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0B1220",
    theme_color: "#0B1220",
    lang: "nl",
    icons: [
      {
        src: "/favicon.ico",
        type: "image/x-icon",
        sizes: "any",
      },
    ],
  };
}
