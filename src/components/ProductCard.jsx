import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { ShoppingCart, Star } from "lucide-react"; // Assuming lucide-react for icons

const ProductCard = ({ product, onOpenProduct }) => {
  const dispatch = useDispatch();
  const {
    id,
    name,
    price,
    mrp,
    discount,
    rating,
    reviews,
    isFeatured,
    isCustomizable,
    imageURL,
  } = product;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: id,
        title: name,
        price: price,
        image: imageURL,
      })
    );
  };

  const content = (
    <div
      className="
      bg-white 
      overflow-hidden 
      transition-all duration-300 
      flex flex-col
      rounded-2xl
      group
      h-full
      shadow-sm
      hover:shadow-lg
      focus:outline-none focus:ring-2 focus:ring-purple-500
    "
    >
      {/* --- Image and Tag Section --- */}
      <div className="relative h-48 w-full bg-gray-100 rounded-t-2xl overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl group-hover:ring-2 group-hover:ring-purple-200">
        <img src={imageURL} alt={name} className="w-full h-full object-cover" />

        {/* Tags at the top left */}
        <div className="absolute top-3 left-3 flex flex-row gap-1.5">
          {isFeatured && (
            <span
              className="
              text-xs 
              font-bold
              px-2 
              py-1 
              rounded-md 
              bg-purple-100 
              text-purple-500 
              border 
              border-purple-500
              whitespace-nowrap
            "
            >
              Featured
            </span>
          )}
          {isCustomizable && (
            <span
              className="
              text-xs 
              font-semibold 
              px-2 
              py-1 
              rounded-md 
              bg-white 
              text-gray-500 
              border 
              border-gray-300
              whitespace-nowrap
            "
            >
              Customizable
            </span>
          )}
        </div>
      </div>

      {/* --- Product Details Section --- */}
      <div className="p-4 flex-grow flex flex-col justify-between min-h-[120px]">
        {/* Product Title - Fixed height to prevent layout shifts */}
        <h3
          className="text-base font-semibold text-gray-800 mb-2 h-10 flex items-center overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {name}
        </h3>

        {/* Price Row */}
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-lg font-bold text-purple-700">₹{price}</span>
          <span className="text-xs line-through text-gray-500">
            MRP: ₹{mrp}
          </span>
          <span className="text-xs font-medium text-purple-600">
            {discount}
          </span>
        </div>

        {/* Rating and Add to Cart */}
        <div className="flex justify-between items-center gap-2 mt-auto">
          <div>
            <div className="flex items-center text-sm text-gray-600">
              <span>{rating}</span>
              <Star
                size={14}
                fill="currentColor"
                className="text-yellow-500 mr-1"
              />
              <span className="text-xs text-gray-500">({reviews})</span>
            </div>
          </div>
          <div>
            <button
              className="
          flex items-center justify-center py-2 px-3 text-white 
          bg-purple-700 hover:bg-purple-800 font-semibold text-sm 
          transition-all duration-300 ease-out 
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
          rounded-sm
          opacity-0 translate-y-1 pointer-events-none
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
        "
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              Add to Cart <ShoppingCart size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  if (onOpenProduct) {
    return (
      <button
        type="button"
        className="text-left w-full"
        onClick={() => onOpenProduct(product)}
      >
        {content}
      </button>
    );
  }
  return <Link to={`/product/${id}`}>{content}</Link>;
};

export default ProductCard;
