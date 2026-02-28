"use client";

import { useState, useEffect, useRef } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchBox({ onSearch, isLoading }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const placeholderIndex = useRef(0);
  const charIndex = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const exampleQueries = [
    "Show me budget laptops",
    "What's good for gaming?",
    "I need something portable",
    "Best monitor for work",
  ];

  const placeholders = [
    "Show me budget laptops...",
    "What's good for gaming?",
    "I need something portable...",
    "Best monitor for work...",
    "Compare wireless headphones...",
  ];

  // Typewriter rotating placeholder effect
  useEffect(() => {
    if (isFocused || query) return; // Stop when user is typing

    const currentPhrase = placeholders[placeholderIndex.current];

    if (isTyping) {
      if (charIndex.current < currentPhrase.length) {
        timeoutRef.current = setTimeout(() => {
          setPlaceholderText(currentPhrase.slice(0, charIndex.current + 1));
          charIndex.current += 1;
        }, 60);
      } else {
        // Pause at end, then start deleting
        timeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (charIndex.current > 0) {
        timeoutRef.current = setTimeout(() => {
          charIndex.current -= 1;
          setPlaceholderText(currentPhrase.slice(0, charIndex.current));
        }, 30);
      } else {
        // Move to next phrase
        placeholderIndex.current = (placeholderIndex.current + 1) % placeholders.length;
        setIsTyping(true);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [placeholderText, isTyping, isFocused, query]);

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up delay-2">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <div
            className={`relative flex-1 transition-all duration-300 rounded-xl ${
              isFocused ? "scale-[1.01] drop-shadow-md" : ""
            }`}
          >
            <svg
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                isFocused ? "text-blue-500" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={isFocused || query ? "Ask me anything about our products..." : placeholderText}
              className="w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all duration-300 text-white bg-white/10 backdrop-blur-sm placeholder-gray-400 focus:bg-white/15 focus:ring-0 search-glow"
              disabled={isLoading}
            />
            {/* Typewriter cursor when not focused */}
            {!isFocused && !query && (
              <span className="typewriter-cursor absolute right-4 top-1/2 -translate-y-1/2" />
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 hover-magnetic active-pop min-w-[120px] justify-center"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="bouncing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                Thinking
              </span>
            ) : (
              "Ask AI"
            )}
          </button>
        </div>
      </form>

      {/* Example queries with stagger animation */}
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {exampleQueries.map((eq, i) => (
          <button
            key={eq}
            onClick={() => {
              setQuery(eq);
              onSearch(eq);
            }}
            disabled={isLoading}
            className={`text-xs px-3 py-1.5 rounded-full bg-white/10 text-gray-300 border border-white/15 hover:bg-white/20 hover:text-white hover:border-indigo-400/40 transition-all duration-200 disabled:opacity-50 hover-lift active-pop ripple animate-fade-in-up delay-${i + 3}`}
          >
            {eq}
          </button>
        ))}
      </div>
    </div>
  );
}
