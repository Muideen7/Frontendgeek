import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "Project";
  const description = searchParams.get("description") || "";
  const tags = searchParams.get("tags")?.split(",") || [];

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        backgroundImage: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "white",
          marginBottom: 20,
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        {title}
      </div>
      {description && (
        <div
          style={{
            fontSize: 24,
            color: "#9ca3af",
            marginBottom: 40,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {description}
        </div>
      )}
      <div style={{ display: "flex", gap: 12 }}>
        {tags.map((tag, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#10b981",
              color: "white",
              padding: "8px 20px",
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {tag}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 20,
          color: "#6b7280",
        }}
      >
        by {process.env.NEXT_PUBLIC_YOUR_NAME}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
