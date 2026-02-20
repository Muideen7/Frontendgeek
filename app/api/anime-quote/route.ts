import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const APPROVED_ANIMES = [
  "naruto",
  "bleach",
  "attack on titan",
  "demon slayer",
  "jujutsu kaisen",
  "rurouni kenshin",
  "one piece",
  "black clover",
];

export async function GET() {
  try {
    let attempts = 0;
    let selectedQuote = null;

    // Try fetching up to 10 times to find a match from your list
    while (attempts < 10) {
      const res = await fetch(
        "https://kitagawachan-api.vercel.app/quotes/random",
        {
          cache: "no-store",
        },
      );
      const data = await res.json();

      const animeName = data.anime.toLowerCase();
      const isMatch = APPROVED_ANIMES.some((a) => animeName.includes(a));

      // Also filter out quotes that look like non-English/Jargon (basic check)
      if (isMatch && data.quote.length > 10) {
        selectedQuote = data;
        break;
      }
      attempts++;
    }

    if (!selectedQuote) {
      // Return a clean fallback if no match found after 10 tries
      return NextResponse.json({
        status: "success",
        data: {
          content:
            "Whatever you lose, you'll find it again. But what you throw away you'll never get back.",
          character: { name: "Kenshin Himura" },
          anime: { name: "Rurouni Kenshin" },
        },
      });
    }

    return NextResponse.json({
      status: "success",
      data: {
        content: selectedQuote.quote,
        character: { name: selectedQuote.character },
        anime: { name: selectedQuote.anime },
      },
    });
  } catch (error) {
    // This shows up in your VS Code terminal, not the browser
    console.error("Anime Quote API failure:", error);

    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
