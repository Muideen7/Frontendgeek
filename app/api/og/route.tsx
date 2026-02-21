import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "Olayeye Muideen";
  const description =
    searchParams.get("description") ||
    "Creative Developer & Anime Archivist";
  const tags = searchParams.get("tags")?.split(",") || [];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            marginBottom: 24,
          }}
        >
          {title}
        </div>

        {description && (
          <div
            style={{
              fontSize: 28,
              color: "#9ca3af",
              marginBottom: 40,
              maxWidth: "900px",
            }}
          >
            {description}
          </div>
        )}

        {tags.length > 0 && (
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {tags.map((tag, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#10b981",
                  color: "white",
                  padding: "10px 22px",
                  borderRadius: 9999,
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 22,
            color: "#6b7280",
          }}
        >
          frontendgeek.vercel.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}