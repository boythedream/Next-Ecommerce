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
      successUrl="https://next-ecommerce-eight-kappa.vercel.app//success"
      cancelUrl="https://next-ecommerce-eight-kappa.vercel.app/cancel"
      billingAddressCollection={true}
      shouldPersist={true} // Keep cart data persistent
      language="en-US"
    >
      {children}
    </USCProvider>
  );
}
