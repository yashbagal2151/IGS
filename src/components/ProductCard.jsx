import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { ShoppingCart, Star } from "lucide-react"; // Assuming lucide-react for icons

const ProductCard = ({ product }) => {
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

  return (
    <Link
      to={`/product/${id}`}
      className="
      bg-white 
      overflow-hidden 
      transition-all duration-300 
      flex flex-col
      rounded-2xl
      group
      focus:outline-none focus:ring-2 focus:ring-purple-500
    "
    >
      {/* --- Image and Tag Section --- */}
      {/* The image container has rounded top corners */}
      <div className="relative h-70 w-full bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl group-hover:ring-2 group-hover:ring-purple-200">
        {/* Placeholder for the image. Ensure your 'imageURL' points to a valid asset. */}
        <img src={imageURL} alt={name} className="w-full h-full object-cover" />

        {/* Tags at the top left */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {isFeatured && (
            <span
              className="
              text-xs 
              font-medium 
              px-2 
              py-1 
              rounded-full 
              bg-purple-100 
              text-purple-700 
              border 
              border-purple-300
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
              font-medium 
              px-2 
              py-1 
              rounded-full 
              bg-white 
              text-gray-700 
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
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="text-base font-semibold text-gray-800 mb-1">{name}</h3>
        {/* Adjusted font size slightly */}
        {/* Price Row */}
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-lg font-bold text-purple-700">₹{price}</span>
          {/* Adjusted font size */}
          <span className="text-xs line-through text-gray-500">
            MRP: ₹{mrp}
          </span>
          <span className="text-xs font-medium text-purple-600">
            {discount}
          </span>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div>
            {/* Rating Row */}
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

      {/* --- Add to Cart Button --- */}
      {/* Button now has rounded bottom corners, matching the card */}
    </Link>
  );
};

export default ProductCard;
