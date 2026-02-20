import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/config";

// 1. Define the GitHub Repo interface for type safety
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  homepage: string | null;
  private: boolean;
  fork: boolean;
  topics?: string[];
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = SITE_CONFIG.github.username;
  const FEATURE_TAG = "portfolio-feature";

  // 2. Safeguard against missing tokens
  if (!token) {
    console.error("Missing GITHUB_TOKEN in environment variables");
    return NextResponse.json({ error: "Configuration error" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
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

    const repos: GitHubRepo[] = await res.json();

    // 3. Filter and Map using the defined interface
    const projects = repos
      .filter(
        (repo: GitHubRepo) => !repo.fork && repo.topics?.includes(FEATURE_TAG),
      )
      .map((repo: GitHubRepo) => ({
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
  } catch (err) {
    console.error("GitHub Projects Fetch Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch repos" },
      { status: 500 },
    );
  }
}
