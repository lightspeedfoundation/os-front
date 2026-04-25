import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Speed OS — onchain trading workspace in your new tab";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(145deg, #060608 0%, #0a0f12 45%, #060608 100%)",
          color: "#f0f2f4",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "rgb(0, 255, 135)",
              boxShadow: "0 0 24px rgba(0, 255, 135, 0.5)",
            }}
          />
          <span style={{ fontSize: 20, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,242,244,0.55)" }}>
            Chrome extension
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            <span style={{ color: "rgb(0, 255, 135)" }}>Speed OS</span>
            <br />
            <span style={{ color: "rgba(240,242,244,0.88)" }}>Onchain trading in every new tab</span>
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: "rgba(240,242,244,0.55)", maxWidth: 820 }}>
            Browser trading workspace · CLI parity · keys on-device · optional MCP
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: 22, color: "rgba(240,242,244,0.4)" }}>ispeed.pro</span>
          <span style={{ fontSize: 20, color: "rgba(0, 255, 135, 0.85)" }}>Add to Chrome</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
