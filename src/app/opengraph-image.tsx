import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const profile = await getProfile();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #9300ff 0%, #e26aff 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#ffffff",
            }}
          />
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 28, fontWeight: 600 }}>
            Open to full-time opportunities
          </div>
        </div>
        <div style={{ display: "flex", color: "#ffffff", fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
          {profile?.name || "Portfolio"}
        </div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.92)", fontSize: 40, fontWeight: 600, marginTop: 18 }}>
          {profile?.title || "Full Stack Web Developer"}
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.8)",
            fontSize: 28,
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          {profile?.location}
        </div>
      </div>
    ),
    { ...size }
  );
}
