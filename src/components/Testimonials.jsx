import React from "react";

export default function Testimonials({ items = [] }) {
  // Carousel settings: 2 visible on sm/md, 4 on lg; autoplay, arrows, drag
  const [viewportWidth, setViewportWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  React.useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isLg = viewportWidth >= 1024;
  const itemsPerView = isLg ? 4 : 2;
  const baseItems = Array.isArray(items) ? items : [];

  const displayItems = React.useMemo(() => {
    const result = [...baseItems];
    const remainder = result.length % itemsPerView;
    const needed = remainder === 0 ? 0 : itemsPerView - remainder;
    for (let i = 0; i < needed; i += 1) {
      if (baseItems.length === 0) break;
      result.push(baseItems[i % baseItems.length]);
    }
    while (result.length < itemsPerView && baseItems.length > 0) {
      result.push(baseItems[result.length % baseItems.length]);
    }
    return result;
  }, [baseItems, itemsPerView]);

  const carouselActive = isLg ? displayItems.length > 4 : true;
  const stepSize = viewportWidth < 1024 ? 1 : itemsPerView;
  const maxIndex = Math.max(0, displayItems.length - itemsPerView);
  const [firstVisibleIndex, setFirstVisibleIndex] = React.useState(0);

  React.useEffect(() => {
    if (!carouselActive || displayItems.length <= itemsPerView) return;
    const id = setInterval(() => {
      setFirstVisibleIndex((idx) =>
        idx + stepSize > maxIndex ? 0 : idx + stepSize
      );
    }, 3000);
    return () => clearInterval(id);
  }, [carouselActive, displayItems.length, itemsPerView, stepSize, maxIndex]);

  const dragStateRef = React.useRef({ dragging: false, startX: 0, moved: 0 });
  const onPointerDown = (e) => {
    dragStateRef.current = {
      dragging: true,
      startX: e.clientX ?? (e.touches ? e.touches[0].clientX : 0),
      moved: 0,
    };
  };
  const onPointerMove = (e) => {
    if (!dragStateRef.current.dragging) return;
    const x = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
    dragStateRef.current.moved = x - dragStateRef.current.startX;
  };
  const onPointerUp = (e) => {
    if (!dragStateRef.current.dragging) return;
    const delta = dragStateRef.current.moved;
    dragStateRef.current.dragging = false;
    const threshold = 30;
    if (Math.abs(delta) > threshold) {
      e.preventDefault();
      e.stopPropagation();
      setFirstVisibleIndex((idx) =>
        delta < 0
          ? idx + stepSize > maxIndex
            ? 0
            : idx + stepSize
          : idx - stepSize < 0
          ? maxIndex
          : idx - stepSize
      );
    }
  };

  return (
    <section className="bg-brand-50 py-16">
      <div className="px-4 md:px-15 lg:px-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-center">
            <h2 className="text-4xl md:text-5xl   leading-tight font-serif font-semibold text-gray-900">
              Experiences Shared by Our Clients
            </h2>
            <div className="flex">
              <div>
                <p className="text-sm text-gray-700 max-w-md">
                  Hear from satisfied customers who have transformed their
                  spaces with our statues
                </p>
                <a
                  href="#"
                  className="inline-block mt-4 text-sm bg-brand-900 text-white px-4 py-2 rounded-md hover:bg-brand-800"
                >
                  View All →
                </a>
              </div>
            </div>
          </div>

          {!carouselActive ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {baseItems.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-brand-100 backdrop-blur rounded-xl p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-md"
                    />
                    <div>
                      <div className="text-base font-semibold text-gray-900">
                        {t.name}
                      </div>
                      {t.role && (
                        <div className="text-xs text-gray-500">{t.role}</div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {t.text}
                  </p>
                  <div
                    className="text-yellow-500 text-lg"
                    aria-label={`${t.stars} star rating`}
                  >
                    {"★".repeat(t.stars || 5)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              <div
                className="overflow-hidden select-none p-2"
                onMouseDown={onPointerDown}
                onMouseMove={onPointerMove}
                onMouseUp={onPointerUp}
                onMouseLeave={onPointerUp}
                onTouchStart={onPointerDown}
                onTouchMove={onPointerMove}
                onTouchEnd={onPointerUp}
              >
                <div
                  className="flex transition-transform duration-500 ease-out gap-0"
                  style={{
                    transform: `translateX(-${
                      (100 / itemsPerView) * firstVisibleIndex
                    }%)`,
                  }}
                >
                  {displayItems.map((t, idx) => (
                    <div
                      key={idx}
                      style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                      className="px-3"
                    >
                      <div className="bg-brand-100 backdrop-blur rounded-xl p-5 shadow-sm h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={t.avatar}
                            alt={t.name}
                            className="w-9 h-9 rounded-md"
                          />
                          <div>
                            <div className="text-base font-semibold text-gray-900">
                              {t.name}
                            </div>
                            {t.role && (
                              <div className="text-xs text-gray-500">
                                {t.role}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                          {t.text}
                        </p>
                        <div
                          className="text-yellow-500 text-lg"
                          aria-label={`${t.stars} star rating`}
                        >
                          {"★".repeat(t.stars || 5)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {displayItems.length > itemsPerView && (
                <>
                  <button
                    type="button"
                    aria-label="Previous"
                    onClick={() =>
                      setFirstVisibleIndex((idx) =>
                        idx - stepSize < 0 ? maxIndex : idx - stepSize
                      )
                    }
                    className="absolute left-1 top-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-md shadow border border-gray-300 hover:border-purple-500 hover:bg-gray-100"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next"
                    onClick={() =>
                      setFirstVisibleIndex((idx) =>
                        idx + stepSize > maxIndex ? 0 : idx + stepSize
                      )
                    }
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded-md shadow border border-gray-300 hover:border-purple-500 hover:bg-gray-100"
                  >
                    →
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
