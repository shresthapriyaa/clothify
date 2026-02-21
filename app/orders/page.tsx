'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ChevronRight, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
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
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem('guestUserId');
      
      if (!userId) {
        setLoading(false);
        return;
      }

      const res = await fetch('/api/orders');
      const data = await res.json();

      let allOrders: Order[] = [];
      if (Array.isArray(data)) {
        allOrders = data;
      } else if (data.data && Array.isArray(data.data)) {
        allOrders = data.data;
      } else if (data.orders && Array.isArray(data.orders)) {
        allOrders = data.orders;
      }

      const userOrders = allOrders.filter(order => order.userId === userId);
      userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setOrders(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
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
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading your orders...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (orders.length === 0) {
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
              No Orders Yet
            </h1>
            
            <p className="text-gray-600 mb-8 text-lg">
              You haven't placed any orders. Start shopping to see your orders here!
            </p>
            
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
            >
              Start Shopping
              <ChevronRight className="w-5 h-5" />
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
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">View and track your order history ({orders.length} {orders.length === 1 ? 'order' : 'orders'})</p>
          </div>

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-semibold text-gray-900">#{order.id.slice(0, 8).toUpperCase()}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                      </span>
                      <p className="text-lg font-bold text-gray-900">
                        ${order.total?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {order.items && order.items.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      <p className="text-sm font-semibold text-gray-900">Order Items ({order.items.length})</p>
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                          {item.product?.image && (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name || 'Product'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                              {item.product?.name || 'Product'}
                            </h3>

                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ${(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 mb-6">
                      <p className="font-semibold text-gray-900 mb-1">Order Details</p>
                      <p>Items will be displayed here once available</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push(`/orders/${order.id}`)}
                      className="inline-flex  items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition" 
                    >
                      View Details
                    </button>
                    
                    {order.status?.toLowerCase() === 'delivered' && (
                      <button
                        onClick={() => router.push('/shop')}
                        className="flex-1 border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Order Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/shop')}
              className="text-gray-600 hover:text-gray-900 underline transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}