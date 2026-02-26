import { NextResponse } from "next/server";
import { allProducts } from "@/lib/data/products";
import { getSupabaseAdmin } from "@/lib/server/supabaseAdmin";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      if (data) {
        const mapped = data.map((p: any) => ({
          id: Number(p.id),
          title: p.title,
          srcUrl: p.src_url,
          gallery: p.gallery ?? undefined,
          price: Number(p.price ?? 0),
          discount: p.discount ?? { amount: 0, percentage: 0 },
          rating: Number(p.rating ?? 0),
          description: p.description ?? undefined,
          category: p.category ?? undefined,
          isNew: !!p.is_new,
          options: p.options ?? undefined,
          variants: p.variants ?? undefined,
        }));
        return NextResponse.json(mapped);
      }
    }
  } catch (e) {
    console.error("Supabase products fetch failed:", e);
  }
  return NextResponse.json(allProducts);
}
