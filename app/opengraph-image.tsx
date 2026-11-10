import { ImageResponse } from "next/og";
import { site } from "@/content/site";
export const alt = "DevsDen Tech — one team from first idea to launch";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 70,
        background: "#F6F8FC",
        color: "#0A1633",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
        {site.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 86,
          lineHeight: 1.02,
          letterSpacing: -4,
          maxWidth: 900,
        }}
      >
        One team from first idea to launch.
      </div>
      <div style={{ display: "flex", color: "#1A62FF", fontSize: 22 }}>
        Software, design and business automation.
      </div>
    </div>,
    size,
  );
}
