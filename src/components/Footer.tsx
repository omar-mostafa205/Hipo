import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';
import { Icons } from './Icons'; // Assuming you have your logo icon

const Footer = () => {
  return (
    <footer className="bg-[#f8f7fe] border-t border-gray-200 py-30">
      <div className="w-screen mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="flex justify-between items-center mx-10">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Icons.logo className="h-8 w-8" />
              <span className="text-2xl font-bold text-gray-900">Hipo</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Your trusted destination for quality products at unbeatable prices. 
              Shop with confidence and enjoy fast, reliable delivery worldwide.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@hipo.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">123 Commerce St, Business District</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 mt-6">
              <Link href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-md transition-all">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-md transition-all">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-pink-600 hover:shadow-md transition-all">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 hover:shadow-md transition-all">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Account */}

      
        </div>



        {/* Payment Methods */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 mx-10">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="text-sm text-gray-600">We accept:</span>
            <div className="flex gap-2">
              <div className="w-10 h-6 bg-white rounded border border-gray-200 flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-gray-400" />
              </div>
              <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                VISA
              </div>
              <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                MC
              </div>
              <div className="w-10 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                AMEX
              </div>
              <div className="w-10 h-6 bg-indigo-600 rounded text-white text-xs flex items-center justify-center font-bold">
                PP
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            © 2025 Hipo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;