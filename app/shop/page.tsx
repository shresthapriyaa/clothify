
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
  sizes: string[];
  colors: string[];
  isBest: boolean;
  isPopular: boolean;
  isSale: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState<string>('');

  useEffect(() => {
    fetchProducts();
    initializeCart();
  }, []);

  const initializeCart = async () => {
    try {
      let userId = localStorage.getItem('guestUserId');
      
      if (!userId) {
        userId = `guest-${Date.now()}`;
        localStorage.setItem('guestUserId', userId);
      }

      // Create guest user in database
      await fetch('/api/users/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestId: userId })
      });

      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      setCartId(data.cartId);
    } catch (error) {
      console.error('Error initializing cart:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const result = await res.json();
      setProducts(result.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product) => {
    if (!cartId) {
      alert('Initializing cart, please try again...');
      await initializeCart();
      return;
    }

    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          productId: product.id,
          quantity: 1,
          size: product.sizes[0] || null,
          color: product.colors[0] || null
        })
      });

      if (response.ok) {
        if (confirm('Item added to cart! Go to cart?')) {
          router.push('/cart');
        }
      } else {
        alert('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Products</h1>
          <button
            onClick={() => router.push('/cart')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            View Cart
          </button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={256}
                    className="object-cover w-full h-full"
                  />
                  
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    {product.isBest && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                        Best
                      </span>
                    )}
                    {product.isPopular && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Popular
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Sale
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {product.category.name}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="mb-4">
                    {product.sizes.length > 0 && (
                      <div className="mb-2">
                        <span className="text-xs text-gray-600">Sizes: </span>
                        <span className="text-xs font-medium">
                          {product.sizes.join(', ')}
                        </span>
                      </div>
                    )}
                    {product.colors.length > 0 && (
                      <div>
                        <span className="text-xs text-gray-600">Colors: </span>
                        <span className="text-xs font-medium">
                          {product.colors.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}