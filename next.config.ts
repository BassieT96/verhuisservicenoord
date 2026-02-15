import type { NextConfig } from "next";

const oneYear = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/zakelijk", destination: "/zakelijk-verhuizen", permanent: true },
      { source: "/senioren", destination: "/seniorenverhuizing", permanent: true },
      { source: "/spoed", destination: "/spoedverhuizing", permanent: true },
      { source: "/offerte", destination: "/contact", permanent: true },
      { source: "/werkgebied-friesland", destination: "/werkgebied", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: oneYear }],
      },
      {
        source: "/:path*\\.(svg|png|jpg|jpeg|webp|ico)",
        headers: [{ key: "Cache-Control", value: oneYear }],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" }],
      },
      {
        source: "/sitemap.xml",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" }],
      },
      {
        source: "/manifest.webmanifest",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" }],
      },
    ];
  },
};

export default nextConfig;
