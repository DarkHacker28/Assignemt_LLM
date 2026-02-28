"use client";

import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  image: string;
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  description,
  tags,
  image,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="block group card-glow-wrapper h-full">
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-sm hover-tilt hover-glow h-full flex flex-col">
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden bg-slate-700">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover img-hover-zoom"
          />
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-2.5 py-1 rounded-full badge-slide">
            {category}
          </span>
          {/* View overlay on image hover */}
          <div className="card-img-overlay">
            <span>View Product</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors duration-300 hover-underline inline-block">
            {name}
          </h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2 flex-1 group-hover:text-gray-300 transition-colors duration-300">
            {description}
          </p>

          {/* Tags with hover pop */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-700 text-gray-300 px-2 py-0.5 rounded-md tag-hover cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price with bounce effect on hover */}
          <div className="mt-3 pt-3 border-t border-slate-700">
            <span className="text-xl font-bold text-emerald-400 price-bounce inline-block">
              Rs. {price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
