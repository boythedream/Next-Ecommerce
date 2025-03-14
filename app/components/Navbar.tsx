"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/Men" },
  { label: "Women", href: "/Women" },
  { label: "Teens", href: "/Teens" },
];

export default function LuxNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { handleCartClick, cartCount = 0 } = useShoppingCart(); // Get dynamic cart count

  return (
    <header className="mb-4 border-b bg-white shadow-lg">
      <div className="flex items-center justify-between mx-auto px-5 sm:px-10 lg:px-16 py-4 max-w-7xl">
        {/* Logo */}
        <Link href="/" className="text-3xl md:text-4xl font-bold tracking-wide">
          Shop<span className="text-primary">Sphere</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-10">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`text-lg font-medium transition duration-300 ${
                pathname === link.href
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section - Cart & Mobile Menu */}
        <div className="flex items-center space-x-6">
          {/* Cart Button with Dynamic Count */}
          <Button
            onClick={() => handleCartClick()}
            variant="ghost"
            className="relative p-4 sm:p-5 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <ShoppingBag size={28} className="text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 rounded-md focus:outline-none transition hover:bg-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white transform ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } transition-transform duration-300 ease-in-out z-50 shadow-lg border-t`}
      >
        <nav className="flex flex-col items-center gap-6 pt-10">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`text-xl font-medium transition duration-200 ${
                pathname === link.href
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-gray-700 hover:text-primary"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
