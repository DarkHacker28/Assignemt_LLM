# 🔍 Discvrai — AI Product Discovery

A mini product discovery experience with a backend API, frontend UI, and AI/LLM integration. Users can browse an electronics catalog and ask questions in natural language like _"Show me budget laptops"_ or _"What's good for gaming?"_ — the AI interprets the query and returns matching products with a summary.

## Tech Stack

- **Frontend + Backend:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS 4
- **AI/LLM:** OpenAI GPT-4o-mini via `openai` SDK
- **Data:** In-memory product catalog (8 products)

## How to Run

### Prerequisites

- Node.js 18+ and npm
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Setup

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd discvrai-product-discovery

# 2. Install dependencies
npm install

# 3. Set your OpenAI API key
cp .env.example .env.local
# Edit .env.local and add your real key:
# OPENAI_API_KEY=sk-your-actual-key

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What's Implemented

### Backend (API Routes)

| Endpoint | Method | Description |
|---|---|---|
| `/api/products` | GET | List all products. Supports `?category=` and `?search=` query params. |
| `/api/ask` | POST | Accepts `{ "query": "..." }`, calls OpenAI to interpret the natural-language query, returns matching products + AI summary. |

### Frontend

- **Product grid** — responsive card layout showing all 8 products
- **AI search box** — type a natural language question, hit "Ask AI", see filtered results + AI summary banner
- **Category filters** — quick filter chips (All, Laptops, Desktops, Audio, etc.)
- **Product detail page** — click any product card → `/products/[id]` with full details and SEO metadata
- **Loading skeletons** — shimmer effect while data loads
- **Error handling** — friendly error banners for API failures
- **Example queries** — clickable suggestion chips under the search box

### AI/LLM Integration

- **Prompt design:** The system prompt includes the full product catalog (ID, name, category, price, tags) so the LLM can match products to the user's intent.
- **Structured output:** The LLM returns JSON `{ "productIds": [...], "summary": "..." }` which is parsed and mapped to full product objects.
- **Error handling:** Graceful handling for rate limits (429), auth failures (401), timeouts, and malformed LLM responses.
- **Model:** `gpt-4o-mini` for fast, cost-effective responses.

### Bonus Features

- ✅ **Next.js** with App Router and API routes
- ✅ **Dynamic routes** — `/products/[id]` for product detail pages
- ✅ **SEO** — `<title>` and `<meta description>` per page via `generateMetadata`
- ✅ **Static generation** — product detail pages pre-rendered at build time via `generateStaticParams`

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── products/route.ts   # GET /api/products
│   │   └── ask/route.ts        # POST /api/ask (LLM integration)
│   ├── products/[id]/page.tsx  # Product detail page
│   ├── layout.tsx              # Root layout with SEO metadata
│   ├── page.tsx                # Main page (product list + AI search)
│   └── globals.css             # Tailwind + custom CSS vars
├── components/
│   ├── ProductCard.tsx         # Reusable product card component
│   └── SearchBox.tsx           # AI search input component
├── data/
│   └── products.ts             # Product catalog (8 products)
└── lib/                        # (extensible for future utilities)
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key. Never committed to the repo. |

## Time Spent

~2 hours

## What I'd Add With More Time

- **Caching** — cache LLM responses for repeated queries (Redis or in-memory)
- **Streaming** — stream the AI response for a ChatGPT-like typing effect
- **Product recommendations** — "You might also like..." powered by embeddings
- **Search history** — persist recent queries in localStorage
- **Tests** — unit tests for API routes and component tests with React Testing Library
- **Deployment** — Vercel for frontend + API, with environment variable config
