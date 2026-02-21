'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Package, Calendar, MapPin, CreditCard } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  size?: string | null;
  color?: string | null;
  product?: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
}

interface Order {
  id: string;
  userId: string;
  status?: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
  shippingAddress?: {
    fullName?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();

      setOrder(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="w-16 h-16 text-gray-400" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Not Found
            </h1>
            
            <p className="text-gray-600 mb-8 text-lg">
              We couldn't find this order.
            </p>
            
            <button
              onClick={() => router.push('/orders')}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Orders
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Back Button */}
          <button
            onClick={() => router.push('/orders')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Orders
          </button>

          {/* Order Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Order #{order.id.slice(0, 8).toUpperCase()}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </div>

              <div className="text-right">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                </span>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Status</h3>
              <div className="flex items-center gap-4">
                <div className={`flex-1 text-center ${order.status ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${order.status ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                  <p className="text-xs font-medium">Placed</p>
                </div>
                <div className={`flex-1 h-1 ${order.status && order.status !== 'pending' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                <div className={`flex-1 text-center ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                  <p className="text-xs font-medium">Processing</p>
                </div>
                <div className={`flex-1 h-1 ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                <div className={`flex-1 text-center ${order.status === 'shipped' || order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                  <p className="text-xs font-medium">Shipped</p>
                </div>
                <div className={`flex-1 h-1 ${order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                <div className={`flex-1 text-center ${order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                  <p className="text-xs font-medium">Delivered</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
                
                {order.items && order.items.length > 0 ? (
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                        {item.product?.image && (
                          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name || 'Product'}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {item.product?.name || 'Product'}
                          </h3>

                          {(item.size || item.color) && (
                            <div className="flex gap-3 text-sm text-gray-600 mb-2">
                              {item.size && (
                                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                                  Size: {item.size}
                                </span>
                              )}
                              {item.color && (
                                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                                  Color: {item.color}
                                </span>
                              )}
                            </div>
                          )}

                          <p className="text-sm text-gray-600">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No items found</p>
                )}
              </div>
            </div>

            {/* Order Summary & Shipping */}
            <div className="lg:col-span-1 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${order.total?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${order.total?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              {order.shippingAddress && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    {order.shippingAddress.fullName && (
                      <p className="font-semibold text-gray-900">{order.shippingAddress.fullName}</p>
                    )}
                    {order.shippingAddress.address && <p>{order.shippingAddress.address}</p>}
                    {(order.shippingAddress.city || order.shippingAddress.state || order.shippingAddress.zipCode) && (
                      <p>
                        {order.shippingAddress.city && `${order.shippingAddress.city}, `}
                        {order.shippingAddress.state && `${order.shippingAddress.state} `}
                        {order.shippingAddress.zipCode}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Need Help */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Contact our support team for assistance with your order.
                </p>
                <button
                  onClick={() => router.push('/contact')}
                  className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
