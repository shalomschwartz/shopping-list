import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CX;

  if (!apiKey || !cx) {
    return NextResponse.json({ error: "API not configured" }, { status: 500 });
  }

  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&searchType=image&q=${encodeURIComponent(q)}&num=5`;

  const res = await fetch(url);
  if (!res.ok) {
    return NextResponse.json({ error: "Google API error" }, { status: 502 });
  }

  const data = await res.json();
  const items: { link: string }[] = data.items ?? [];
  const images = items.map((item) => item.link);

  return NextResponse.json({ images });
}
