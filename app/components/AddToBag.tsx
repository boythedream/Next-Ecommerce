"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  price_id: string; // Assuming a unique identifier is available
}

export default function AddToBag({
  currency,
  description,
  name,
  price,
  image,
  price_id
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    price_id, // Use dynamic id
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
  };

  const handleAddToCart = () => {
    addItem(product);
    handleCartClick();
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-lg flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="font-medium">Add to Cart</span>
    </Button>
  );
}
