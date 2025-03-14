"use client";
import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    console.error("Missing Stripe public key! Check your .env file.");
  }

  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!} // Pass as a string
      currency="USD"
      successUrl="http://localhost:3000/success"
      cancelUrl="http://localhost:3000"
      billingAddressCollection={true}
      shouldPersist={true} // Keep cart data persistent
      language="en-US"
    >
      {children}
    </USCProvider>
  );
}
