import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/config";

const ANILIST_API = "https://graphql.anilist.co";

const query = `
query ($userName: String) {
  MediaListCollection(userName: $userName, type: ANIME, status: COMPLETED, sort: SCORE_DESC) {
    lists {
      entries {
        media {
          id
          title { romaji english }
          coverImage { extraLarge }
          description
          averageScore
          genres
          episodes
          seasonYear
          siteUrl
        }
        score
      }
    }
  }
}
`;

// 1. Define interfaces to replace 'any'
interface AniListEntry {
  score: number;
  media: {
    id: number;
    title: { romaji: string; english: string | null };
    coverImage: { extraLarge: string };
    description: string | null;
    averageScore: number;
    genres: string[];
    episodes: number | null;
    seasonYear: number | null;
    siteUrl: string;
  };
}

export async function GET() {
  const username = SITE_CONFIG.anilist?.username;
  if (!username) return NextResponse.json([]);

  try {
    const response = await fetch(ANILIST_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { userName: username } }),
      next: { revalidate: 3600 },
    });

    const data = await response.json();
    const entries: AniListEntry[] =
      data?.data?.MediaListCollection?.lists?.[0]?.entries || [];

    const favoriteAnime = entries.slice(0, 6).map((entry) => ({
      id: entry.media.id,
      title: entry.media.title.english || entry.media.title.romaji,
      image: entry.media.coverImage.extraLarge,
      description: entry.media.description?.replace(/<[^>]*>/g, ""),
      score: entry.score || entry.media.averageScore,
      genres: entry.media.genres,
      episodes: entry.media.episodes,
      year: entry.media.seasonYear,
      url: entry.media.siteUrl,
    }));

    return NextResponse.json(favoriteAnime);
  } catch (err) {
    // 2. Handle 'error' by naming it 'err' and logging it or ignoring it safely
    console.error("AniList API Error:", err);
    return NextResponse.json([]);
  }
}
