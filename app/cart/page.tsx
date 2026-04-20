'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  size: string | null;
  color: string | null;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  } | null;
}

export default function CartPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeCart();
  }, []);

  
  const initializeCart = async () => {
    try {
      let userId = localStorage.getItem('guestUserId');

      if (!userId) {
        userId = `guest-${Date.now()}`;
        localStorage.setItem('guestUserId', userId);
      }

      // guest user bhanaunay
      await fetch('/api/users/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestId: userId }),
      });

     //create or fetch garnay cart
      const cartRes = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const cartData = await cartRes.json();

      setCartId(cartData.cartId);
      setCartItems(Array.isArray(cartData.items) ? cartData.items : []);
    } catch (error) {
      console.error('Cart init error:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  
  const fetchCartItems = async () => {
    if (!cartId) return;

    try {
      const res = await fetch(`/api/cart?cartId=${cartId}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setCartItems(data);
      } else if (Array.isArray(data.items)) {
        setCartItems(data.items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
      setCartItems([]);
    }
  };

  
  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!res.ok) throw new Error();

      // optimistic update
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Update quantity error:', error);
    }
  };

  
  const removeItem = async (itemId: string) => {
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error();

      // optimistic remove
      setCartItems(prev =>
        Array.isArray(prev) ? prev.filter(item => item.id !== itemId) : []
      );
    } catch (error) {
      console.error('Remove item error:', error);
    }
  };

  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (!item.product) return total;
      return total + item.product.price * item.quantity;
    }, 0);
  };

  
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading cart...</p>
      </div>
    );
  }

  
 
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add items to get started.</p>
        <button
          onClick={() => router.push('/')}
          className="bg-gray-900 text-white px-8 py-3 rounded-lg"
        >
          Go to Home
        </button>
      </div>
    );
  }

  
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => {
              if (!item.product) return null;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-6 flex gap-4"
                >
                  <div className="w-24 h-24 relative bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {item.product.name}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      {item.size && `Size: ${item.size}`}{" "}
                      {item.color && `• Color: ${item.color}`}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex border rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => router.push(`/checkout?cartId=${cartId}`)}
              className="w-full bg-gray-900 text-white py-3 rounded-lg"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => router.push('/')}
              className="w-full mt-3 border py-3 rounded-lg bg-gray-900 text-white"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
