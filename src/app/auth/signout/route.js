import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  const supabase = createClient();

  await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/", request.url));
}

export async function GET(request) {
  const supabase = createClient();

  await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/", request.url));
}
