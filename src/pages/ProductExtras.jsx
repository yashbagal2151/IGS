import React from "react";
import categoriesData from "../data/categories.json";
import products from "../data/products.json";
import CraftStorySection from "../components/CraftStorySection.jsx";
import RelatedCategoryCarousel from "../components/RelatedCategoryCarousel.jsx";

export default function ProductExtras({ productId }) {
  // Build list of all products with categoryId
  const all = React.useMemo(() => {
    const arr = [];
    categoriesData.sections.forEach((s) => s.products.forEach((p) => arr.push({ ...p, categoryId: s.id })));
    return [...arr, ...products];
  }, []);

  const product = all.find((p) => p.id === productId);
  if (!product) return null;
  const categoryId = product.categoryId || (product.category || "").toLowerCase().replace(/\s+/g, "-");
  const related = all.filter((p) => (p.categoryId || (p.category || "").toLowerCase().replace(/\s+/g, "-")) === categoryId && p.id !== product.id);

  return (
    <div>
      <CraftStorySection categoryId={categoryId} />
      <RelatedCategoryCarousel items={related} />
    </div>
  );
}
