import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function RelatedCategoryCarousel({ items = [], autoplayMs = 3500 }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const getPerView = () => {
    if (typeof window === "undefined") return 4;
    const w = window.innerWidth;
    if (w >= 1024) return 4; // lg
    if (w >= 768) return 2; // md
    return 1; // sm
  };

  const [perView, setPerView] = React.useState(getPerView());
  React.useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const slides = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < items.length; i += perView) {
      arr.push(items.slice(i, i + perView));
    }
    return arr;
  }, [items, perView]);

  const [index, setIndex] = React.useState(0);
  const goPrev = () => setIndex((p) => (p === 0 ? slides.length - 1 : p - 1));
  const goNext = () => setIndex((p) => (p === slides.length - 1 ? 0 : p + 1));

  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const id = setInterval(goNext, Math.max(1500, autoplayMs));
    return () => clearInterval(id);
  }, [slides.length, autoplayMs, paused]);

  return (
    <section className="my-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-serif font-semibold text-center mb-6">Statues You Might Also Like</h2>
        <div className="relative rounded-2xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {slides.length > 1 && (
            <button
              type="button"
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-brand-700 text-white hover:bg-brand-800 rounded-full shadow-lg w-10 h-10 flex items-center justify-center"
              onClick={goPrev}
              aria-label="Previous"
            >
              ‹
            </button>
          )}
          {/* fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent" />
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500"
              style={{ width: `${slides.length * 100}%`, transform: `translateX(-${index * (100 / slides.length)}%)` }}
            >
              {slides.map((group, sIdx) => (
                <div key={sIdx} className="min-w-full px-2">
                  <div className={`grid gap-6 ${perView >= 4 ? 'grid-cols-4' : perView === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {group.map((p) => (
                      <div key={p.id} className="transform transition-transform hover:-translate-y-1">
                        <ProductCard product={p} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {slides.length > 1 && (
            <button
              type="button"
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-brand-700 text-white hover:bg-brand-800 rounded-full shadow-lg w-10 h-10 flex items-center justify-center"
              onClick={goNext}
              aria-label="Next"
            >
              ›
            </button>
          )}
          {slides.length > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-brand-700' : 'w-2 bg-brand-300'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
