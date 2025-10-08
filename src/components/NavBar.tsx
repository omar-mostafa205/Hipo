"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Bell, User, Search } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "./Icons";
import Cart from "./Cart";
import { SearchForm } from "./Search";
import { useUser } from "@clerk/nextjs";

const FloatingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
const user = useUser()
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  return (
    <>
      {/* Desktop Navbar (lg and up) */}
      <nav
        className={`fixed top-4 left-1/2 z-50 hidden -translate-x-1/2 mb-40 rounded-full bg-[#ffffff] shadow-lg transition-all duration-300 lg:block ${
          "w-fit py-4"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 mr-5">
                  <Image src="/hipologo.png" alt="Hipo Logo" width={35} height={35} className="mr-[-7px]" />
                <span className="text-brand-navy text-xl font-bold">Hipo</span>
              </Link>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-64 rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-6 text-sm font-medium mx-10">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Homepage
                </Link>
                <Link href="/list?cat=00000000-000000-000000-000000000001&name=All%20Products" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Shop
                </Link>
                <Link href="/deals" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Deals
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center gap-4">
              <Bell className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
              <User className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
              <Cart />
            </div>
          </div>
        </div>
      </nav>

      {/* Medium Screen Navbar (md to lg) */}
      <nav
        className={`fixed top-4 left-1/2 z-50 hidden mx-5 -translate-x-1/2 rounded-full bg-white shadow-lg transition-all duration-300 md:block lg:hidden ${
          "w-[70%] py-4"
        }`}
      >
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center gap-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <Icons.logo className="h-8 w-8" />
                <span className="text-brand-navy text-xl font-bold">Hipo</span>
              </div>


            </div>

            {/* Right side - Cart and Auth only */}
            <div className="flex items-center gap-4">
              <Bell className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
              <User className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
              <Cart />
              {user ? (
                <Button>
                  <Link href="/dashboard" className="text-white">
                    Dashboard
                  </Link>
                </Button>
              ) : (
<div></div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar (logo + menu button) */}
      <nav className="fixed top-4 left-1/2 z-50 flex w-[70%] mx-5 -translate-x-1/2 items-center justify-between rounded-full bg-white px-4 py-3 shadow-md md:hidden">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-6 w-6" />
          <span className="text-brand-navy text-lg font-bold">Hipo</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 hover:text-blue-600 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-20 left-1/2 z-40 w-[90%] -translate-x-1/2 overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4">
          {/* Search Input */}
              <SearchForm />
          {/* Navigation Links */}
          <div className="space-y-4 mb-6">
            <Link 
              href="/" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Homepage
            </Link>
            <Link 
              href="/list?cat=00000000-000000-000000-000000000001&name=All%20Products" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/deals" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Deals
            </Link>
            <Link 
              href="/about" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          {/* User Actions */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Bell className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
                <User className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
                <Cart />
              </div>
              
              {user ? (
                <Button size="sm">
                  <Link href="/dashboard" className="text-white">
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <Link href="/sign-in">
                  <Button size="sm">Get Started</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingNavbar;