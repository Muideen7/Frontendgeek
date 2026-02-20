import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/config";

export async function GET() {
  // 1. Pull token from process.env for security
  const token = process.env.GITHUB_TOKEN;
  const username = SITE_CONFIG.github.username;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      {
        headers: {
          // Use 'token' or 'Bearer' - GitHub supports both, but 'token' is standard for PATs
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        // Cache data so you don't hit rate limits while developing
        next: { revalidate: 3600 },
      },
    );

    // 2. Check if the response is actually okay
    if (!response.ok) {
      const errorData = await response.json();
      console.error("GitHub API Error:", errorData);
      return NextResponse.json([]); // Return empty array to keep frontend happy
    }

    const events = await response.json();

    // 3. Final safety check: ensure events is an array
    if (!Array.isArray(events)) {
      return NextResponse.json([]);
    }

    const commits = events
      .filter((event: any) => event.type === "PushEvent")
      .slice(0, 20)
      .map((event: any) => ({
        repo: event.repo.name.split("/")[1], // Just the repo name, not 'user/repo'
        commits: event.payload.commits.map((commit: any) => ({
          message: commit.message,
          sha: commit.sha.substring(0, 7),
        })),
        createdAt: event.created_at,
      }));

    return NextResponse.json(commits);
  } catch (error) {
    console.error("Fetch Error:", error);
    // 4. Always return an array, even on total failure
    return NextResponse.json([]);
  }
}
