import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { products } from "@/data/products";

// Build a concise product context string for the LLM
function buildProductContext(): string {
  return products
    .map(
      (p) =>
        `ID:${p.id} | ${p.name} | ${p.category} | $${p.price} | Tags: ${p.tags.join(", ")}`
    )
    .join("\n");
}

// POST /api/ask — natural language query powered by LLM
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = body.query;

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a valid query." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is not configured. Please set the OPENAI_API_KEY." },
        { status: 503 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const systemPrompt = `You are a helpful product discovery assistant for an electronics store.
You have access to the following product catalog:

${buildProductContext()}

When the user asks a question, you MUST respond with valid JSON only (no markdown, no extra text).
Use this exact format:
{
  "productIds": [1, 2],
  "summary": "A short 1-2 sentence explanation of why these products match."
}

Rules:
- "productIds" should contain the IDs of matching products (can be empty if nothing matches).
- "summary" should be a friendly, concise explanation.
- If the query is unclear, return your best guess with a helpful summary.
- Only return products from the catalog above.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const raw = completion.choices[0]?.message?.content?.trim() || "";

    // Parse the LLM response as JSON
    let parsed: { productIds: number[]; summary: string };
    try {
      // Handle potential markdown code fences from LLM
      const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      // Fallback: if parsing fails, return the raw text as summary
      return NextResponse.json({
        productIds: [],
        summary: raw || "I found some results but couldn't parse them properly.",
        products: [],
      });
    }

    // Map product IDs to full product objects
    const matchedProducts = products.filter((p) =>
      parsed.productIds.includes(p.id)
    );

    return NextResponse.json({
      productIds: parsed.productIds,
      summary: parsed.summary,
      products: matchedProducts,
    });
  } catch (error: unknown) {
    console.error("LLM API error:", error);

    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      if (error.status === 429) {
        return NextResponse.json(
          { error: "AI service is rate-limited. Please try again in a moment." },
          { status: 503 }
        );
      }
      if (error.status === 401) {
        return NextResponse.json(
          { error: "AI service authentication failed. Check your API key." },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "Something went wrong with the AI service. Please try again." },
      { status: 502 }
    );
  }
}
