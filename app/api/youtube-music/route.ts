import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/config";

export async function GET() {
  const { apiKey, playlistId } = SITE_CONFIG.youtube;

  // Error handling for missing configuration
  if (!apiKey || !playlistId) {
    return NextResponse.json(
      { error: "YouTube API Key or Playlist ID missing in .env" },
      { status: 400 },
    );
  }

  try {
    // We use the playlistItems endpoint which is perfect for curated music lists
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache the music list for 1 hour to save API quota
    });

    const data = await response.json();

    if (data.error) {
      console.error("YouTube API Error:", data.error.message);
      return NextResponse.json(
        { error: "YouTube API Error", details: data.error.message },
        { status: data.error.code || 500 },
      );
    }

    // Map the YouTube data into a clean "Music" format
    const tracks = (data.items || []).map((item: any) => {
      const videoId = item.snippet.resourceId?.videoId;
      const rawTitle = item.snippet.title;

      // YouTube Music often puts the artist in the 'videoOwnerChannelTitle'
      // or it's part of the 'channelTitle'. We clean it up here.
      const artistName = (
        item.snippet.videoOwnerChannelTitle ||
        item.snippet.channelTitle ||
        "Unknown Artist"
      )
        .replace(" - Topic", "")
        .trim();

      return {
        id: videoId,
        // Removes bracketed text like (Official Video) or [Lyrics]
        title: rawTitle.replace(/\s*[\(\[][^)]*[\)\]]\s*/g, "").trim(),
        artist: artistName,
        thumbnail:
          item.snippet.thumbnails.maxres?.url ||
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.default?.url,
        url: `https://music.youtube.com/watch?v=${videoId}`,
      };
    });

    return NextResponse.json(tracks);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 },
    );
  }
}
