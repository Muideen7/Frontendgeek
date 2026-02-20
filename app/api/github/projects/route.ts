import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/config";

export async function GET() {
  const token = process.env.GITHUB_TOKEN!;
  const username = SITE_CONFIG.github.username;
  const FEATURE_TAG = "portfolio-feature";

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { error: error.message },
        { status: res.status },
      );
    }

    const repos = await res.json();

    const projects = repos
      .filter((repo: any) => !repo.fork && repo.topics?.includes(FEATURE_TAG))
      .map((repo: any) => ({
        id: repo.id,
        title: repo.name.replace(/[-_]/g, " "),
        description:
          repo.description ??
          "A technical exploration and project showcase hosted on GitHub.",
        stars: repo.stargazers_count,
        language: repo.language,
        url: repo.html_url,
        homepage: repo.homepage,
        isPrivate: repo.private,
      }));

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch repos" },
      { status: 500 },
    );
  }
}
