
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
      
      // Create guest user in database first
      const userRes = await fetch('/api/users/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestId: userId })
      });
      
      if (!userRes.ok) {
        console.error('Failed to create guest user');
        setLoading(false);
        return;
      }
      
      // Now create/get cart
      const cartRes = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      
      if (!cartRes.ok) {
        console.error('Cart API error:', await cartRes.text());
        setLoading(false);
        return;
      }

      const cartData = await cartRes.json();
      console.log('Cart initialized:', cartData);
      setCartId(cartData.cartId);
      setCartItems(cartData.items || []);
    } catch (error) {
      console.error('Error initializing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    if (!cartId) return;
    
    try {
      const res = await fetch(`/api/cart?cartId=${cartId}`);
      const data = await res.json();
      setCartItems(data || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(itemId);
      return;
    }

    try {
      await fetch(`/api/cart/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE'
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (!item.product) return total;
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some items to get started!</p>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              if (!item.product) return null;
              
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-6 flex gap-4"
                >
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="object-cover rounded w-full h-full"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {item.product.name}
                    </h3>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.size && item.color && <span className="mx-2">•</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push(`/checkout?cartId=${cartId}`)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => router.push('/')}
                className="w-full mt-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}