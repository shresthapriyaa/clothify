'use client';


export const dynamic = "force-dynamic";


import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

interface CheckoutForm {
  email: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cartId = searchParams.get('cartId');

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    email: '',
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  useEffect(() => {
    if (cartId) {
      fetchCartItems();
    } else {
      router.push('/cart');
    }
  }, [cartId, router]);

  const fetchCartItems = async () => {
    if (!cartId) return;

    try {
      const res = await fetch(`/api/cart?cartId=${cartId}`);
      const data = await res.json();

      // Make sure cartItems is always an array
      const itemsArray = Array.isArray(data.items) ? data.items : [];
      setCartItems(itemsArray);

      if (itemsArray.length === 0) {
        router.push('/cart');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      router.push('/cart');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (!item.product) return total;
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      let userId = localStorage.getItem('guestUserId');

      if (!userId) {
        alert('Session expired. Please try again.');
        router.push('/cart');
        return;
      }

      // Ensure guest user exists
      const userRes = await fetch('/api/users/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestId: userId })
      });

      if (!userRes.ok) {
        alert('Failed to verify user. Please try again.');
        setProcessing(false);
        return;
      }

      const total = calculateTotal();

      if (cartItems.length === 0 || total <= 0) {
        alert('Your cart is empty or invalid.');
        setProcessing(false);
        return;
      }

      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          total,
          items: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size || '',
            color: item.color || ''
          }))
        })
      });

      const orderData = await orderRes.json();

      if (orderRes.ok && orderData.success) {
        // Clear cart
        await Promise.all(
          cartItems.map(item =>
            fetch(`/api/cart/${item.id}`, { method: 'DELETE' })
          )
        );

        router.push(`/order/success?orderId=${orderData.data.id}`);
      } else {
        console.error('Order creation failed:', orderData);
        alert(`Failed to create order: ${orderData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading checkout...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* for shipping form ko lagii */}

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {['email', 'fullName', 'address', 'city', 'state', 'zipCode', 'phone'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-2">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    required
                    value={formData[field as keyof CheckoutForm]}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={field}
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={processing || cartItems.length === 0}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
              >
                {processing ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

         
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map(item => {
                  if (!item.product) return null;
                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                          {item.size && ` • Size: ${item.size}`}
                          {item.color && ` • ${item.color}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push('/cart')}
              className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-semibold"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
