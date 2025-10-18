import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ChevronRight } from "lucide-react";

/**
 * Reusable ProductSection component for category sections
 * Props:
 * - title: string (section title)
 * - subtitle?: string (optional subtitle)
 * - products: array of product objects
 * - showViewMore?: boolean (show arrow link)
 * - maxItems?: number (limit displayed products)
 */
export default function ProductSection({
  title,
  subtitle,
  products = [],
  showViewMore = true,
  maxItems = 4,
  categoryId,
  onOpenProduct,
}) {
  const displayedProducts = products.slice(0, maxItems);
  const [viewportWidth, setViewportWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const isLg = viewportWidth >= 1024;
  const itemsPerView = isLg ? 4 : 2;
  const carouselActive = isLg ? displayedProducts.length > 4 : true;
  const stepSize = viewportWidth < 768 ? 1 : itemsPerView;
  const maxIndex = Math.max(0, displayedProducts.length - itemsPerView);
  const [firstVisibleIndex, setFirstVisibleIndex] = React.useState(0);

  React.useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  React.useEffect(() => {
    setFirstVisibleIndex((idx) => Math.min(idx, maxIndex));
  }, [maxIndex]);

  React.useEffect(() => {
    if (!carouselActive || displayedProducts.length <= itemsPerView) return;
    const id = setInterval(() => {
      setFirstVisibleIndex((idx) => {
        const next = idx + stepSize;
        return next > maxIndex ? 0 : next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, [carouselActive, displayedProducts.length, itemsPerView, stepSize, maxIndex]);

  // Map category titles to filter IDs
  const getCategoryFilterId = (title) => {
    const categoryMap = {
      "Chhatrapati Shivaji Maharaj Statues": "shivaji",
      "Mavale Statues": "mavale",
      "God Statues": "god-statues",
      "Motivational Statues": "motivational",
      "Home Decor": "home-decor",
    };
    return categoryMap[title] || categoryId;
  };

  return (
    <section className="container mx-auto py-12">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h3>
            <Link
              to={`/filter?category=${getCategoryFilterId(title)}`}
              className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-900 mb-2 hover:text-purple-700"
            >
              {title} <ChevronRight size={20} className="mt-1" />
            </Link>
          </h3>
        </div>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>

      {/* Products Grid or Carousel - Responsive */}
      {!carouselActive ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenProduct={onOpenProduct}
            />
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${(100 / itemsPerView) * firstVisibleIndex}%)`,
              }}
            >
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                  className="px-3"
                >
                  <ProductCard
                    product={product}
                    onOpenProduct={onOpenProduct}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
