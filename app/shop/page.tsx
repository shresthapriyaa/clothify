
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import WishlistButton from '@/components/WishlistButton';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: {
    id: string;
    name: string;
  };
  sizes: string[];
  colors: string[];
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
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartId) {
      toast.error('Initializing cart, please try again...');
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
        toast.success('Added to cart!');
      } else {
        toast.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop All Products</h1>
          <p className="text-gray-600">Discover our collection of premium products</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-2">No products found</p>
            <p className="text-gray-500">Check back soon for new items</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="block"
              >
                <div className="bg-white rounded-xl border overflow-hidden">
                  
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    
                    {/* Wishlist Button  */}
                    <div className="absolute top-3 left-3 z-10">
                      <WishlistButton 
                        product={product}
                        className="bg-white/90 p-2 rounded-full shadow-lg"
                      />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {product.category.name}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {(product.sizes.length > 0 || product.colors.length > 0) && (
                      <div className="mb-3 text-xs text-gray-600 space-y-1">
                        {product.sizes.length > 0 && (
                          <div>
                            <span className="font-medium">Sizes:</span> {product.sizes.slice(0, 3).join(', ')}
                            {product.sizes.length > 3 && '...'}
                          </div>
                        )}
                        {product.colors.length > 0 && (
                          <div>
                            <span className="font-medium">Colors:</span> {product.colors.slice(0, 3).join(', ')}
                            {product.colors.length > 3 && '...'}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      
                      <button
                        onClick={(e) => addToCart(product, e)}
                        className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        title="Add to cart"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}