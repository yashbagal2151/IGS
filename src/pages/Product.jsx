import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import products from "../data/products.json";
import categoriesData from "../data/categories.json";
import { Star } from "lucide-react";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Build a unified product list from categories and standalone products
  const getAllProducts = () => {
    const all = [];
    categoriesData.sections.forEach((section) => {
      section.products.forEach((p) => {
        all.push({ ...p, categoryId: section.id, categoryName: section.title });
      });
    });
    return [...all, ...products];
  };

  const allProducts = getAllProducts();
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="text-center mt-10 text-gray-500">Product not found.</div>
    );
  }

  const title = product.name || product.title || "Product";
  const imageSrc = product.imageURL || product.image;
  const mrp = product.mrp;
  const discount = product.discount;
  const rating = product.rating;
  const reviews = product.reviews;
  const material = product.material;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        {/* Image */}
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4">
          <img
            src={imageSrc}
            alt={title}
            className="max-h-[500px] w-auto object-contain rounded-lg"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

          {(rating || reviews) && (
            <div className="flex items-center text-sm text-gray-600">
              {rating && (
                <>
                  <span className="mr-1">{rating}</span>
                  <Star size={16} className="text-yellow-500" fill="currentColor" />
                </>
              )}
              {reviews && <span className="ml-2 text-gray-500">({reviews} reviews)</span>}
            </div>
          )}

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-extrabold text-purple-700">₹{product.price}</span>
            {mrp && (
              <span className="text-sm line-through text-gray-500">MRP: ₹{mrp}</span>
            )}
            {discount && (
              <span className="text-sm font-medium text-purple-600">{discount}</span>
            )}
          </div>

          {material && (
            <div className="text-sm text-gray-700">Material: <span className="font-medium capitalize">{material}</span></div>
          )}

          <div className="mt-4 flex gap-3">
            <button
              onClick={() =>
                dispatch(
                  addToCart({ id: product.id, title, price: product.price, image: imageSrc })
                )
              }
              className="px-5 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
            >
              Add to Cart
            </button>
            <a
              href="/checkout"
              className="px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
