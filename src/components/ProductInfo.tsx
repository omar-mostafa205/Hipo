/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import React from "react";
import { ShoppingCart, Heart, Share2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductInfo = ({ product }: { product: any }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState("M");
  const [isWishlist, setIsWishlist] = React.useState(false);
  const [showWarranty, setShowWarranty] = React.useState(false);
  
  const sizes = ["S", "M", "L"];
  const maxQuantity = 25;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <div className="flex flex-col space-y-6 p-6">
      {/* Header with title and action buttons */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name || "Classic Leather Watch"}
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-3xl font-bold text-gray-900">
              ${product.priceData?.price?.toFixed(2) || "299.00"}
            </span>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              SKU: {product.sku || "CLW-001-BR-SV"}
            </span>
          </div>
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-medium">In Stock</span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-2">
          <button
            onClick={toggleWishlist}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
        
          </button>
     
        </div>
      </div>

      {/* Description */}
      <div className="text-gray-600 leading-relaxed">
        <p>
          {product.description?.replace(/<\/?[^>]+(>|$)/g, "") || 
           "Crafted with precision and elegance, this premium leather watch combines timeless design with modern functionality. The supple brown leather strap and polished silver case create a sophisticated accessory perfect for both professional and casual settings. Each watch is meticulously assembled to ensure lasting quality and reliable performance."}
        </p>
      </div>

      {/* Size Selection */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-medium text-gray-900">Size</span>
          <span className="text-gray-500">({selectedSize})</span>
        </div>
        <div className="flex space-x-3">
        {product.productOptions?.map((option: any) => (
  <div key={option.name}>
    <button
      onClick={() => setSelectedSize(option.name)}
      className={`w-12 h-12 rounded-lg font-medium transition-all ${
        selectedSize === option.name
          ? "bg-gray-900 text-black"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {option.name}
    </button>
  </div>
))}

             
          
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 rounded-lg font-medium transition-all ${
                selectedSize === size
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-3">
        <span className="text-lg font-medium text-gray-900">Quantity:</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
            >
              −
            </button>
            <div className="w-12 h-10 flex items-center justify-center border-x border-gray-300 font-medium">
              {quantity}
            </div>
            <button
              onClick={increaseQuantity}
              disabled={quantity >= maxQuantity}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">Max: {maxQuantity}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 pt-4">
        <Button
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-7 text-lg font-medium rounded-lg transition-colors"
          onClick={() => addItem
          }
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>

        <Button
          variant="outline"
          className="w-full border-2 border-gray-300 hover:bg-gray-50 text-gray-800 py-7 text-lg font-medium rounded-lg transition-colors"
          onClick={() =>
            console.log(`Buy now: ${quantity} of size ${selectedSize}`)
          }
        >
          Buy Now
        </Button>
      </div>

      {/* Warranty Section */}
      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={() => setShowWarranty(!showWarranty)}
          className="flex justify-between items-center w-full py-3 text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
            </div>
            <span className="text-lg font-medium text-gray-900">Warranty</span>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform ${
              showWarranty ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        {showWarranty && (
          <div className="mt-3 pl-9 text-gray-600">
            <p>This product comes with a 2-year manufacturer warranty covering defects in materials and workmanship.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;