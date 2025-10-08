/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Tag } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const { cart, counter, isLoading, getCart, addItem, removeItem } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  const cartItems = cart?.lineItems || [];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price?.amount || 0) * (item.quantity || 1),
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild className="ml-2">
        <Button variant="outline" className="relative rounded-full p-2">
          <ShoppingCart className="h-6 w-6" />
          {counter > 0 && (
            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              {counter}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="!max-w-[500px] p-6">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3 text-2xl font-bold">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        {counter === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <Image
              src="/hippo-empty-cart.png"
              alt="Empty Cart"
              width={400}
              height={400}
              className="mt-[100px] mb-4"
            />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Your cart is empty
            </h3>
            <p className="mb-6 text-gray-600">
              Add some amazing Codelet products to get started!
            </p>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex h-full flex-col overflow-scroll">
            <div className="mb-6 flex-1 space-y-4 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    {/* صورة المنتج */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.name || "Product"}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* بيانات المنتج */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="truncate font-semibold text-gray-900">
                            {item.name}
                          </h4>
                          <p className="truncate text-sm text-gray-600">
                            {item.description}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <Tag className="h-3 w-3 text-blue-600" />
                            <span className="text-xs font-medium text-blue-600">
                              {item.category || "General"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            Qty: {item.quantity}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            {formatPrice(
                              (item.price?.amount || 0) * (item.quantity || 1)
                            )}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-500">
                              {formatPrice(item.price?.amount || 0)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-700">
                  Subtotal
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <Button className="w-full bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700">
                Checkout • {formatPrice(totalPrice)}
              </Button>
              <Button variant="outline" className="w-full py-2">
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
