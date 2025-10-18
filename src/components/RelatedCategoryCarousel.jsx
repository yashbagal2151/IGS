import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function RelatedCategoryCarousel({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 pb-10 text-center">
          Statues You Might Also Like
        </h2>

        {/* Tailwind Responsive Grid for Cards - Same as CategoryPage */}
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-8
        "
        >
          {items.map((product) => (
            // The ProductCard handles its own max-width and margin for centering on smaller screens
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No related products found.
          </p>
        )}
      </div>
    </section>
  );
}
