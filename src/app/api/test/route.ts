import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*");

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ serverError: err });
  }
}