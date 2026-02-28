import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let filtered = [...products];

  // Filter by category if provided
  if (category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by keyword search if provided
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
    );
  }

  return NextResponse.json({ products: filtered });
}
