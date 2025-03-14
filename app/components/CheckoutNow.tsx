"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { ProductCart } from "./AddToBag";

export default function CheckoutNow({ price_id }: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart();

  async function buyNow() {
    if (!price_id) {
      console.error("❌ Error: Missing Stripe price ID");
      return;
    }
    
    if (!checkoutSingleItem) {
      console.error("❌ Error: checkoutSingleItem is not available. Check CartProvider setup.");
      return;
    }

    console.log("✅ Checking out with Price ID:", price_id);

    try {
      await checkoutSingleItem(price_id);
      console.log("✅ Checkout successful!");
    } catch (error) {
      console.error("❌ Error during checkout:", error);
    }
  }

  return (
    <Button
      onClick={buyNow}
      className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-lg flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="font-medium">Checkout Now</span>
    </Button>
  );
}
