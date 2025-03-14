// cancel-page.tsx
"use client";
import React from "react";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="max-w-lg mx-auto my-16 p-8 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="bg-yellow-100 p-4 rounded-full mb-6">
          <XCircle className="h-16 w-16 text-yellow-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-8">
          Your payment process was cancelled. Your cart items are still saved.
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
            onClick={() => router.back()}
            className="border border-indigo-300 text-indigo-600 hover:bg-indigo-50 py-3 rounded-full text-lg font-semibold transition"
          >
            Return to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}