"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    total: 0,
  });

  useEffect(() => {
    // Extract session ID from URL if needed
    // In a real app, you might want to verify the payment with your backend
    // For demo purposes, we're just generating a fake order ID
    setOrderDetails({
      orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
      total: parseFloat((Math.random() * 100 + 50).toFixed(2)),
    });
    
    // Clear the cart here if needed
    // Example: clearCart() if you have a function for this
  }, []);

  return (
    <div className="max-w-lg mx-auto my-16 p-8 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="bg-green-100 p-4 rounded-full mb-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been processed successfully.</p>
        
        <div className="w-full bg-gray-50 p-6 rounded-lg mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-medium">{orderDetails.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-bold text-indigo-600">${orderDetails.total.toFixed(2)}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-6">
          A confirmation email has been sent to your registered email address.
        </p>
        
        <div className="flex flex-col w-full gap-3">
          <Button 
            onClick={() => router.push("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full text-lg font-semibold shadow-md transition"
          >
            Continue Shopping
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => router.push("/account/orders")}
            className="border border-indigo-300 text-indigo-600 hover:bg-indigo-50 py-3 rounded-full text-lg font-semibold transition"
          >
            View My Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
