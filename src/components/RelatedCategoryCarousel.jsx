import React from "react";
import ProductCard from "./ProductCard.jsx";

/**
 * RelatedCategoryCarousel
 * Renders a responsive grid of related products.
 * Inputs:
 * - items: array of product objects (already filtered to the same category)
 * Data flow:
 * - Each product object is passed to the shared ProductCard for consistent UI/behavior.
 */
export default function RelatedCategoryCarousel({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null; // nothing to render

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 pb-10 text-center">
          Statues You Might Also Like
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
