"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ProductCard from "@/components/ProductCard";
import SearchBox from "@/components/SearchBox";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [aiResults, setAiResults] = useState<Product[]>([]);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [countPop, setCountPop] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch {
      setError("Failed to load products. Please refresh the page.");
    } finally {
      setIsInitialLoad(false);
    }
  };


  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    setError("");

    const source = aiResults.length > 0 ? aiResults : products;

    if (category === "All") {
      setFilteredProducts(source);
      return;
    }

    setFilteredProducts(source.filter((p) => p.category === category));
  };


  const handleAskAI = async (query: string) => {
    setIsLoading(true);
    setError("");
    setAiSummary("");
    setActiveCategory("All");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setFilteredProducts(products);
        return;
      }

      const matched = data.products?.length > 0 ? data.products : [];
      setAiSummary(data.summary || "");
      setAiResults(matched);
      setFilteredProducts(matched);
    } catch {
      setError("Failed to reach the AI service. Please try again.");
      setFilteredProducts(products);
    } finally {
      setIsLoading(false);
    }
  };

 
  const handleReset = () => {
    setFilteredProducts(products);
    setAiResults([]);
    setAiSummary("");
    setError("");
    setActiveCategory("All");
  };

  
  useEffect(() => {
    if (!isInitialLoad) {
      setCountPop(true);
      const timer = setTimeout(() => setCountPop(false), 400);
      return () => clearTimeout(timer);
    }
  }, [filteredProducts.length, isInitialLoad]);

  // Scroll-triggered reveal for product cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = gridRef.current?.querySelectorAll(".scroll-reveal");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredProducts]);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <main className="min-h-screen page-enter">
      <header className="animated-gradient-bg border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center mb-6 animate-fade-in-down">
            <h1 className="text-3xl font-bold text-white">
              <span className="emoji-float">🔍</span> Discvrai
            </h1>
            <p className="text-gray-400 mt-1 animate-fade-in delay-2">
              AI-powered product discovery — ask anything in plain English
            </p>
          </div>

          <SearchBox onSearch={handleAskAI} isLoading={isLoading} />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">

        {aiSummary && (
          <div className="mb-6 p-4 bg-indigo-950/50 border border-indigo-500/30 rounded-xl flex items-start gap-3 animate-scale-in">
            <span className="text-2xl animate-wiggle-hover cursor-default">🤖</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-indigo-300">AI Assistant</p>
              <p className="text-indigo-200 mt-0.5">{aiSummary}</p>
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-indigo-400 hover:text-indigo-300 underline whitespace-nowrap hover-lift active-pop"
            >
              Show all
            </button>
          </div>
        )}


        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-500/30 rounded-xl flex items-start gap-3 animate-scale-in">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <p className="text-red-300">{error}</p>
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-red-400 hover:text-red-300 underline hover-lift active-pop"
            >
              Dismiss
            </button>
          </div>
        )}


        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ripple active-pop animate-fade-in-up delay-${i + 1} ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                  : "bg-white/10 text-gray-300 border border-white/15 hover:bg-white/15 hover:border-indigo-400/40 hover:text-indigo-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-400 mb-4 animate-fade-in">
          Showing{" "}
          <span className={`inline-block font-semibold text-gray-200 ${countPop ? "animate-number-pop" : ""}`}>
            {filteredProducts.length}
          </span>{" "}
          product{filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {isInitialLoad && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`bg-slate-800 rounded-xl border border-slate-700 overflow-hidden animate-fade-in-up delay-${i + 1}`}
              >
                <div className="h-48 shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-5 shimmer rounded w-3/4" />
                  <div className="h-4 shimmer rounded w-full" />
                  <div className="h-4 shimmer rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isInitialLoad && filteredProducts.length > 0 && (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                className="scroll-reveal h-full"
                style={{ transitionDelay: `${Math.min(i * 0.06, 0.5)}s` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        )}

        {!isInitialLoad && filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-16 animate-fade-in-up">
            <p className="text-5xl mb-4 animate-float">🔎</p>
            <p className="text-lg text-gray-300">No products found</p>
            <p className="text-sm text-gray-500 mt-1">
              Try a different query or browse all products
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 text-sm hover-magnetic active-pop"
            >
              Show all products
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
