import Link from "next/link";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} — Discvrai`,
    description: product.description,
  };
}

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 page-enter">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="back-arrow-link inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium hover-underline active-pop transition-colors duration-200"
          >
            <svg className="back-arrow-icon w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to products
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm animate-fade-in-up hover-glow">
          {/* Product Image */}
          <div className="h-72 sm:h-96 bg-gray-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover img-hover-zoom"
            />
          </div>

          {/* Product Details */}
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="animate-fade-in-up delay-1">
                <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full mb-3 hover-lift">
                  {product.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
              </div>
              <span className="text-3xl font-bold text-green-600 animate-pop-in delay-2">
                Rs. {product.price}
              </span>
            </div>

            <p className="text-gray-600 mt-4 text-lg leading-relaxed animate-fade-in delay-3">
              {product.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.map((tag, i) => (
                <span
                  key={tag}
                  className={`text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full tag-hover cursor-default animate-fade-in-up delay-${i + 3}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 animate-fade-in-up delay-4">
              <Link
                href="/"
                className="back-arrow-link inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 hover-magnetic active-pop"
              >
                <svg className="back-arrow-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Browse more products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
