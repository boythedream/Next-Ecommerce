"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PaymentErrorPage() {
  const router = useRouter();
  const [errorDetails, setErrorDetails] = React.useState("");
  
  React.useEffect(() => {
    // Extract error details from URL if available
    const urlParams = new URLSearchParams(window.location.search);
    const errorMsg = urlParams.get("error");
    setErrorDetails(errorMsg || "An unexpected error occurred during the payment process.");
  }, []);

  return (
    <div className="max-w-lg mx-auto my-16 p-8 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="bg-red-100 p-4 rounded-full mb-6">
          <AlertTriangle className="h-16 w-16 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-4">
          We encountered an issue while processing your payment.
        </p>
        
        <div className="w-full bg-red-50 p-6 rounded-lg mb-8 text-left">
          <h3 className="font-medium text-red-800 mb-1">Error Details:</h3>
          <p className="text-red-700">{errorDetails}</p>
        </div>
        
        <p className="text-gray-500 text-sm mb-6">
          If this issue persists, please contact our support team.
        </p>
        
        <div className="flex flex-col w-full gap-3">
          <Button 
            onClick={() => router.push("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full text-lg font-semibold shadow-md transition"
          >
            Return to Home
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => router.back()}
            className="border border-indigo-300 text-indigo-600 hover:bg-indigo-50 py-3 rounded-full text-lg font-semibold transition"
          >
            Try Again
          </Button>
          
          <Button 
            variant="ghost"
            onClick={() => router.push("/support")}
            className="text-gray-600 hover:bg-gray-100 py-3 rounded-full text-lg font-semibold transition"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}