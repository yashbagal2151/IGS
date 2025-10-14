import React, { useRef } from "react";

export default function CarouselHorizontal({ items = [], renderItem }) {
  const ref = useRef(null);
  const scrollBy = (dx) => {
    ref.current?.scrollBy({ left: dx, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <button type="button" className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full shadow px-2 py-1" onClick={() => scrollBy(-320)} aria-label="Previous">‹</button>
      <div ref={ref} className="overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-5 pb-4">
        {items.map((it, idx) => (
          <div key={idx} className="snap-start min-w-[280px]">{renderItem(it)}</div>
        ))}
      </div>
      <button type="button" className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full shadow px-2 py-1" onClick={() => scrollBy(320)} aria-label="Next">›</button>
    </div>
  );
}
