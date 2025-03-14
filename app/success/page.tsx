"use client";
import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="max-w-lg mx-auto my-16 p-8 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="bg-green-100 p-4 rounded-full mb-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been processed successfully.
        </p>

        

        <div className="flex flex-col w-full gap-3">
          <Button
            onClick={() => router.push("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full text-lg font-semibold shadow-md transition"
          >
            Continue Shopping
          </Button>

         
        </div>
      </div>
    </div>
  );
}
