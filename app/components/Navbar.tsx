"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";

const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { handleCartClick, cartCount } = useShoppingCart(); // Get dynamic cart count

  return (
    <header className="mb-4 border-b bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto px-3 sm:px-10 lg:px-10 py-4 sm:py-4 lg:py-4 max-w-7xl">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl md:text-4xl font-bold">
            Next<span className="text-primary">Ecommerce</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-10">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`text-lg font-semibold transition duration-200 ${
                pathname === link.href
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section - Cart & Hamburger */}
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
            className="lg:hidden p-3 rounded-md focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-t shadow-md py-6 z-50">
          <nav className="flex flex-col items-center gap-6">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={`text-lg font-semibold transition duration-200 ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
