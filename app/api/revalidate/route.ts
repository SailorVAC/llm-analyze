import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * Force-refresh the Hugging Face trending cache on demand.
 *
 *   POST /api/revalidate
 *   Authorization: Bearer <REVALIDATE_TOKEN>
 *
 * Set `REVALIDATE_TOKEN` in your environment. Without it the endpoint is locked.
 */
export async function POST(request: Request) {
  const token = process.env.REVALIDATE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_TOKEN not configured" },
      { status: 503 }
    );
  }
  const auth = request.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  revalidateTag("hf-trending");
  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}
