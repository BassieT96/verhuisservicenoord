import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #0B1220 0%, #101B33 60%, #0F1A2E 100%)",
          color: "#F5F7FF",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "70%" }}>
          <p style={{ fontSize: 28, margin: 0, opacity: 0.8 }}>Verhuisbedrijf Friesland</p>
          <h1 style={{ fontSize: 72, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "16px 0" }}>
            {siteConfig.name}
          </h1>
          <p style={{ fontSize: 30, margin: 0, opacity: 0.86 }}>
            Verhuizen in Leeuwarden, Drachten, Sneek, Heerenveen en Harlingen.
          </p>
        </div>
        <p style={{ fontSize: 36, fontWeight: 700 }}>{siteConfig.phoneDisplay}</p>
      </div>
    ),
    {
      ...size,
    },
  );
}
