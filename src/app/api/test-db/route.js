export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:4000/test-db");

    const text = await res.text();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: "Backend returned empty response",
      });
    }

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch (err) {
      return NextResponse.json({
        success: false,
        error: "Invalid JSON from backend",
        raw: text,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
