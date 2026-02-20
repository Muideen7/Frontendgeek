import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/config";

export async function GET() {
  const token = SITE_CONFIG.github.token;
  const username = SITE_CONFIG.github.username;
  const FEATURE_TAG = "portfolio-feature"; // Tag your repos with this on GitHub

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 3600 },
      },
    );

    const repos = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: repos.message },
        { status: res.status },
      );
    }

    const projects = repos
      .filter((repo: any) => repo.topics && repo.topics.includes(FEATURE_TAG))
      .map((repo: any) => ({
        id: repo.id,
        title: repo.name.replace(/-/g, " ").replace(/_/g, " "),
        description:
          repo.description ||
          "A technical exploration and project showcase hosted on GitHub.",
        stars: repo.stargazers_count,
        language: repo.language,
        url: repo.html_url,
        homepage: repo.homepage,
        isPrivate: repo.private,
      }));

    return NextResponse.json(projects);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch repos" },
      { status: 500 },
    );
  }
}
