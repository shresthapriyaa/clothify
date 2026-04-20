// 'use client';

// import Footer from '@/components/Footer';
// import Navbar from '@/components/Navbar';
// import { useRouter, useSearchParams } from 'next/navigation';

// export default function OrderSuccessPage() {  
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get('orderId');

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
//         <h1 className="text-2xl font-bold mb-2">Order Success! 🎉</h1>
//         {orderId && <p>Order ID: {orderId}</p>}
//         <button
//           onClick={() => router.push('/shop')}
//           className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
//         >
//           Continue Shopping
//         </button>
//       </div>
      
//     </div>
//   );
// }





'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';

function OrderSuccessContent() {  
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Order Placed Successfully! 🎉
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
          {orderId && (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-gray-900">#{orderId.slice(0, 8).toUpperCase()}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">What's Next?</h3>
                <p className="text-sm text-gray-600">
                  You'll receive an email confirmation shortly with your order details and tracking information.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold text-gray-900">Estimated Delivery:</span> 3-5 business days
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">Email:</span> Confirmation sent to your email
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/orders')}
            className="flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Package className="w-5 h-5" />
            View My Orders
          </button>

          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-300 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/shop')}
            className="text-gray-600 hover:text-gray-900 underline transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading...</div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}