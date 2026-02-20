import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/config";

export async function GET() {
  const { username, token } = SITE_CONFIG.github;

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );
    const userData = await userResponse.json();

    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );
    const repos = await reposResponse.json();

    const totalStars = repos.reduce(
      (acc: number, repo: any) => acc + repo.stargazers_count,
      0,
    );
    const totalForks = repos.reduce(
      (acc: number, repo: any) => acc + repo.forks_count,
      0,
    );
    const languages = [
      ...new Set(repos.map((repo: any) => repo.language).filter(Boolean)),
    ];

    return NextResponse.json({
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars,
      totalForks,
      languagesUsed: languages.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch achievements" },
      { status: 500 },
    );
  }
}
