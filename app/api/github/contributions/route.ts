import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/config";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = SITE_CONFIG.github.username;

  if (!token) {
    return NextResponse.json([]);
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { login: username },
      }),
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    const json = await response.json();

    if (!response.ok || json.errors) {
      console.error("GitHub GraphQL Error:", json.errors);
      return NextResponse.json([]);
    }

    const weeks =
      json.data.user.contributionsCollection.contributionCalendar.weeks;

    const formatted = weeks.map((week: any) =>
      week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
      })),
    );

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GraphQL Fetch Error:", error);
    return NextResponse.json([]);
  }
}
