import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API not configured" }, { status: 500 });
  }

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=5`;

  const res = await fetch(url, {
    headers: { Authorization: apiKey },
  });

  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json({ error: `Pexels error ${res.status}: ${body}` }, { status: 502 });
  }

  const data = await res.json();
  const images: string[] = (data.photos ?? []).map(
    (p: { src: { medium: string } }) => p.src.medium
  );

  return NextResponse.json({ images });
}
