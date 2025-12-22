'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function OrderSuccessPage() {  
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Order Success! 🎉</h1>
        {orderId && <p>Order ID: {orderId}</p>}
        <button
          onClick={() => router.push('/shop')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}