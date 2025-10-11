import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import products from "../data/products.json";
import categoriesData from "../data/categories.json";
import { Star, Truck, Shield, ShoppingCart } from "lucide-react";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedMaterial, setSelectedMaterial] = useState("marble");
  const [selectedSize, setSelectedSize] = useState("small");
  const [pincode, setPincode] = useState("");
  const [deliveryEstimate, setDeliveryEstimate] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
  const isCustomizable = product.isCustomizable;
  const isFeatured = product.isFeatured;

  // Create array of product images (sample additional images)
  const productImages = [
    imageSrc,
    `https://picsum.photos/300/300?random=${product.id}-1`,
    `https://picsum.photos/300/300?random=${product.id}-2`,
  ];

  const currentImage = productImages[selectedImageIndex];

  const handleCheckDelivery = () => {
    if (pincode.length >= 6) {
      setDeliveryEstimate("Between 14 - 16 October, 8am - 10pm");
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const materialOptions = [
    { value: "marble", label: "Marble (Hand-Carved)" },
    { value: "resin", label: "Resin (High-Density)" },
  ];

  const sizeOptions = [
    { value: "small", label: "Small", description: "Under 6 in" },
    { value: "medium", label: "Medium", description: "6 in - 10 in" },
    { value: "large", label: "Large", description: "10 in - 15 in" },
    { value: "extra-large", label: "Extra Large", description: "Above 15 in" },
  ];

  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity((q) => Math.min(99, q + 1));
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) {
      dispatch(
        addToCart({
          id: product.id,
          title,
          price: product.price,
          image: imageSrc,
          material: selectedMaterial,
          size: selectedSize,
        })
      );
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/checkout";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-purple-700">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <Link to="/filter" className="hover:text-purple-700">
              Products
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900">{product.category}</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900">{title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Images */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
              <img
                src={currentImage}
                alt={title}
                className="max-h-[500px] w-auto object-contain"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                    index === selectedImageIndex
                      ? "border-purple-500 ring-2 ring-purple-200"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-1">{rating}</span>
                  <Star
                    size={16}
                    className="text-yellow-500"
                    fill="currentColor"
                  />
                  <span className="ml-1">({reviews})</span>
                </div>
                {isFeatured && (
                  <span
                    className="text-xs 
              font-bold
              px-2 
              py-1 
              rounded-md 
              bg-purple-100 
              text-purple-500 
              border 
              border-purple-500
              whitespace-nowrap"
                  >
                    Featured
                  </span>
                )}
                {isCustomizable && (
                  <span
                    className="text-xs 
              font-semibold 
              px-2 
              py-1 
              rounded-md 
              bg-white 
              text-gray-500 
              border 
              border-gray-300
              whitespace-nowrap"
                  >
                    Customizable
                  </span>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-purple-700">
                ₹{product.price}
              </span>
              {mrp && (
                <span className="text-lg line-through text-gray-500">
                  ₹{mrp}
                </span>
              )}
              {discount && (
                <span className="text-lg font-medium text-purple-600">
                  {discount}
                </span>
              )}
            </div>

            {/* Purchase Stats */}
            <p className="text-sm text-gray-600">50 purchased in last month</p>

            {/* Delivery Check */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Check Delivery
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleCheckDelivery}
                  className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
                >
                  Check
                </button>
              </div>
              {deliveryEstimate && (
                <p className="text-sm text-green-600">{deliveryEstimate}</p>
              )}
            </div>

            {/* Material Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Material</h3>
              <div className="grid grid-cols-4 gap-2">
                {materialOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center cursor-pointer p-1 border border-gray-200 rounded-lg hover:border-purple-300 transition"
                  >
                    <input
                      type="radio"
                      name="material"
                      value={option.value}
                      checked={selectedMaterial === option.value}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      className="mr-3 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Size</h3>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {sizeOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center cursor-pointer p-1 border border-gray-200 rounded-lg hover:border-purple-300 transition"
                  >
                    <input
                      type="radio"
                      name="size"
                      value={option.value}
                      checked={selectedSize === option.value}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="mr-3 text-purple-600 focus:ring-purple-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        ({option.description})
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="mt-4 flex items-center gap-4">
              <div className="inline-flex items-center border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={decrement}
                  className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                >
                  -
                </button>
                <div className="px-4 py-2 text-sm min-w-10 text-center">
                  {quantity}
                </div>
                <button
                  type="button"
                  onClick={increment}
                  className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="px-2 py-2 bg-white text-purple-700 border border-purple-700 rounded-lg hover:bg-purple-50 transition flex items-center gap-2"
              >
                Add to Cart <ShoppingCart size={15} />
              </button>
              <button
                onClick={handleBuyNow}
                className="px-2 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
              >
                Buy Now
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 text-xl">💳</span>
                </div>
                <p className="text-xs text-gray-600">
                  Cash on Delivery available
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck size={20} className="text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">
                  Free delivery above ₹1,000
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield size={20} className="text-purple-600" />
                </div>
                <p className="text-xs text-gray-600">Secure Payments</p>
              </div>
            </div>

            {/* About This Item */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                About this item
              </h3>
              <p className="text-sm text-gray-600">
                Primary Material: Hand-Carved White Indian Marble (Single Block)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
