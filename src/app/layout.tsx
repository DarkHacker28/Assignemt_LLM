import type { Metadata } from "next";
import "./globals.css";
import BubbleTrail from "@/components/BubbleTrail";

export const metadata: Metadata = {
  title: "Discvrai — AI Product Discovery",
  description:
    "Discover the perfect tech products using natural language. Powered by AI to understand what you need.",
  keywords: ["product discovery", "AI search", "electronics", "shopping"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-900">
        <BubbleTrail />
        {children}
      </body>
    </html>
  );
}
