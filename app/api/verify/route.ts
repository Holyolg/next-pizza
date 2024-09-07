import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Неверный код" }, { status: 400 });
    }
  } catch (error) {
    console.error("[VERIFY_GET] Server error", error);
  }
}
