import React from "react";
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
    <div
      className="
      bg-white 
      overflow-hidden 
      transition 
      duration-300 
      flex flex-col
    "
    >
      {/* --- Image and Tag Section --- */}
      {/* The image container has rounded top corners */}
      <div className="relative h-96 w-full bg-gray-50 rounded-t-xl overflow-hidden flex items-center justify-center rounded-xl 
      shadow-lg 
      hover:shadow-xl">
        {/* Placeholder for the image. Ensure your 'imageURL' points to a valid asset. */}
        <img
          src={imageURL}
          alt={name}
          className="w-full h-full object-cover" // Changed to object-cover for better fit, but object-contain if you need entire image visible
        />

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
      <div className="p-4 flex-grow">
        <h3 className="text-base font-semibold text-gray-800 mb-1">{name}</h3>{" "}
        {/* Adjusted font size slightly */}
        {/* Price Row */}
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-lg font-bold text-gray-900">₹{price}</span>{" "}
          {/* Adjusted font size */}
          <span className="text-xs line-through text-gray-500">
            MRP: ₹{mrp}
          </span>
          <span className="text-xs font-medium text-purple-600">
            {discount}
          </span>
        </div>
        <div className="flex justify-between">
          <div>
            {/* Rating Row */}
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-semibold text-yellow-500 mr-1">
                {rating}
              </span>
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
          flex items-center justify-center w-full py-2 px-1 text-white 
          bg-purple-700 hover:bg-purple-800 font-semibold text-sm 
          transition duration-150 ease-in-out 
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
          rounded-md
        "
              onClick={handleAddToCart}
            >
              Add to Cart <ShoppingCart size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Add to Cart Button --- */}
      {/* Button now has rounded bottom corners, matching the card */}
    </div>
  );
};

export default ProductCard;
