import React from "react";
import ProductCard from "./ProductCard.jsx";

/**
 * RelatedCategoryCarousel
 * Responsive carousel for related products.
 * Rules:
 * - Desktop (lg+): use carousel only if items.length > 4, else render a static 4-column grid.
 * - Tablet (md): always carousel with 2 cards visible.
 * - Mobile (sm): always carousel with 2 cards visible and step moves 1 card.
 */
export default function RelatedCategoryCarousel({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const [viewportWidth, setViewportWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const isLg = viewportWidth >= 1024; // Tailwind lg breakpoint
  const isMd = viewportWidth >= 768 && viewportWidth < 1024; // Tailwind md

  // 2 visible on mobile/tablet, 4 on desktop
  const itemsPerView = isLg ? 4 : 2;

  // Enable carousel on desktop only if > 4 items; always on md/sm
  const carouselActive = isLg ? items.length > 4 : true;

  // On mobile, advance one-by-one; otherwise advance by itemsPerView
  const stepSize = viewportWidth < 768 ? 1 : itemsPerView;

  const maxIndex = Math.max(0, items.length - itemsPerView);
  const [firstVisibleIndex, setFirstVisibleIndex] = React.useState(0);

  React.useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Clamp current index if viewport or list size changes
  React.useEffect(() => {
    setFirstVisibleIndex((idx) => Math.min(idx, maxIndex));
  }, [maxIndex]);

  const goPrev = () => {
    setFirstVisibleIndex((idx) => {
      const next = idx - stepSize;
      return next < 0 ? maxIndex : next;
    });
  };

  const goNext = () => {
    setFirstVisibleIndex((idx) => {
      const next = idx + stepSize;
      return next > maxIndex ? 0 : next;
    });
  };

  // Autoplay similar to home page carousel
  React.useEffect(() => {
    if (!carouselActive || items.length <= itemsPerView) return;
    const id = setInterval(() => {
      setFirstVisibleIndex((idx) => {
        const next = idx + stepSize;
        return next > maxIndex ? 0 : next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, [carouselActive, items.length, itemsPerView, stepSize, maxIndex]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 pb-10 text-center">
          Statues You Might Also Like
        </h2>

        {!carouselActive ? (
          // Desktop with <= 4 items: render a simple responsive grid (no carousel controls)
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // Carousel wrapper
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${(100 / itemsPerView) * firstVisibleIndex}%)`,
                }}
              >
                {items.map((product) => (
                  <div
                    key={product.id}
                    style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                    className="px-4"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            {items.length > itemsPerView && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={goPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 border shadow hover:bg-white px-3 py-2"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={goNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 border shadow hover:bg-white px-3 py-2"
                >
                  ›
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
