"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// Define CartItem type
interface CartItem {
  id: string;
  name: string;
  price: number;
  price_id: string;
  quantity: number;
  image: string;
}

// Define CheckoutOptions type
interface CheckoutOptions {
  mode: "payment" | "subscription";
  lineItems: { price: string; quantity: number }[];
  successUrl: string;
  cancelUrl: string;
}

const ShoppingCartModel: React.FC = () => {
  const {
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    incrementItem,
    decrementItem,
    removeItem,
    redirectToCheckout,
  } = useShoppingCart();

  const router = useRouter();
  const isCartEmpty = !cartDetails || Object.keys(cartDetails).length === 0;

  // Ensure cartDetails is typed correctly
// Ensure cartDetails is typed correctly
const cartItems: CartItem[] = Object.values(cartDetails ?? {}).map((item) => ({
  id: item.id,
  name: item.name,
  price: item.price,
  price_id: (item as any).price_id ?? "", // Ensure price_id exists
  quantity: item.quantity,
  image: item.image,
}));

  // Calculate subtotal
  const subtotal: number = cartItems.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  // Handle checkout
  const handleCheckout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const checkoutOptions: CheckoutOptions = {
        mode: "payment",
        lineItems: cartItems.map((item) => ({
          price: item.price_id,
          quantity: item.quantity,
        })),
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cancel`,
      };

      const result = await redirectToCheckout(checkoutOptions);

      if (result?.error) {
        console.error("❌ Error during checkout:", result.error.message);
        window.location.href = `${window.location.origin}/error?error=${encodeURIComponent(result.error.message)}`;
      }
    } catch (error) {
      console.error("❌ Error during checkout:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      window.location.href = `${window.location.origin}/error?error=${encodeURIComponent(
        errorMessage
      )}`;
    }
  };

  const handleContinueShopping = () => {
    handleCartClick(false); // Close the cart
    router.push("/"); // Navigate to shop page
  };

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
      <SheetContent className="sm:max-w-lg w-[90vw] bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-xl flex flex-col border-l border-indigo-100">
        {/* Cart Header */}
        <SheetHeader className="border-b border-gray-200 pb-4">
          <SheetTitle className="text-2xl font-bold text-indigo-800 flex items-center">
            <ShoppingBag className="mr-2 h-6 w-6 text-indigo-600" />
            Your Shopping Cart
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items - Scrollable Section */}
        <div className="flex-1 overflow-y-auto max-h-[70vh] mt-4 px-2">
          {isCartEmpty ? (
            <div className="text-center py-10 flex flex-col items-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-center text-gray-500 text-xl font-medium">
                Your cart is empty
              </p>
              <p className="text-gray-400 mt-2">Add items to get started</p>
              <Button
                onClick={handleContinueShopping}
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full text-lg font-medium shadow-md transition"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                      width={100}
                      height={100}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-xl font-bold text-indigo-600">
                        ${(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => decrementItem(product.id)}
                        disabled={product.quantity <= 1}
                        className="border border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 text-gray-700 rounded-full h-8 w-8"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-lg font-semibold text-gray-800 w-6 text-center">
                        {product.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => incrementItem(product.id)}
                        className="border border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 text-gray-700 rounded-full h-8 w-8"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(product.id)}
                        className="ml-auto text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Checkout Section */}
        {!isCartEmpty && (
          <div className="p-5 border-t border-gray-200 bg-white rounded-b-lg mt-4 shadow-inner">
            <div className="text-xl font-bold text-gray-900 flex justify-between items-center">
              <span>Subtotal:</span>
              <span className="text-indigo-600">${subtotal.toFixed(2)}</span>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full text-lg font-semibold shadow-lg transition"
            >
              Proceed to Checkout
            </Button>

            <Button
              onClick={handleContinueShopping}
              className="w-full mt-3 bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-300 py-3 rounded-full text-lg font-semibold transition"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModel;
