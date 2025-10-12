import React from 'react';
import categoriesData from '../data/categories.json';
import ProductSection from '../components/ProductSection.jsx';
import CategoryMosaic from '../components/CategoryMosaic.jsx';

export default function Collections() {
  return (
    <div>
      {/* Main Section Title */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Featured Collection</h1>
          <p className="text-gray-600 text-xl">Our most popular and highest-rated statues</p>
        </div>
      </section>

      {/* Category Sections */}
      {categoriesData.sections.map((section) => (
        <div key={section.id} id={`section-${section.id}`}>
          <ProductSection
            title={section.title}
            subtitle={section.subtitle}
            products={section.products}
            showViewMore={true}
            maxItems={4}
            categoryId={section.id}
          />
        </div>
      ))}

      {/* New Mosaic Section below collections */}
      <CategoryMosaic />
    </div>
  );
}
