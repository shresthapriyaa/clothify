
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { 
  ShoppingCart, 
  Heart, 
  ChevronLeft, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw, 
  Share2 
} from 'lucide-react';


//types
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  category?: { 
    id: string; 
    name: string;
  } | null;
  sizes?: string[];
  colors?: string[];
  isBest?: boolean;
  isPopular?: boolean;
  isSale?: boolean;
  stock?: number;
  rating?: number;
  reviewCount?: number;
}


export default function ProductDetailPage() {
  // Router hooks
  const params = useParams();
  const router = useRouter();

  // State management
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

 
  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
    initializeCart();
  }, [params.id]);

  
  const initializeCart = async () => {
    try {
      // Get or create guest user ID
      let userId = localStorage.getItem('guestUserId');
      if (!userId) {
        userId = `guest-${Date.now()}`;
        localStorage.setItem('guestUserId', userId);
      }

      // Create/get cart for this user
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      
      const data = await res.json();
      setCartId(data.cartId);
    } catch (error) {
      console.error('Error initializing cart:', error);
    }
  };

  
  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      
      if (!res.ok) {
        throw new Error('Product not found');
      }
      
      const data = await res.json();
      const productData = data.data || data;

      // Ensure arrays exist
      productData.sizes = productData.sizes || [];
      productData.colors = productData.colors || [];
      
      setProduct(productData);

      // Set default selections
      if (productData.sizes.length > 0) {
        setSelectedSize(productData.sizes[0]);
      }
      if (productData.colors.length > 0) {
        setSelectedColor(productData.colors[0]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
      setLoading(false);
    }
  };

  
  const handleAddToCart = async () => {
    if (!product) return;

    // Validate size selection
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    // Validate color selection
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    // Check if cart is ready
    if (!cartId) {
      toast.error('Initializing cart, please try again');
      await initializeCart();
      return;
    }

    setAddingToCart(true);

    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          productId: product.id,
          quantity,
          size: selectedSize || null,
          color: selectedColor || null,
        }),
      });

      if (res.ok) {
        toast.success('Added to cart!');
        router.push('/cart');
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Something went wrong');
    } finally {
      setAddingToCart(false);
    }
  };

  //  WISHLIST TOGGLE 
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  
  const handleShare = () => {
    if (navigator.share && product) {
      // Use native share if available
      navigator.share({
        title: product.name,
        text: `Check out ${product.name}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            
            <div className="space-y-4">
              <div className="animate-pulse bg-gray-200 aspect-square rounded-xl"></div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse bg-gray-200 w-24 h-24 rounded-lg"></div>
                ))}
              </div>
            </div>
            
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  
  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <button
              onClick={() => router.push('/shop')}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Back to Shop
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

 
  const productImages = product.images || [product.image];

  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
      
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          
          <div className="order-1">
            
            {/* Main Product Image */}
            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4">
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              
              
              {product.isSale && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg">
                  SALE
                </span>
              )}
              
              
              {product.stock && product.stock < 10 && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg">
                  Only {product.stock} left!
                </span>
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          
          <div className="order-2">
            
         

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating Stars */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(product.rating!)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            
            <div className="mb-6">
              <p className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>

           
            {product.description && (
              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[60px] px-4 py-3 border-2 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                          : 'border-gray-200 hover:border-gray-400 text-gray-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

           
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`relative px-6 py-3 border-2 rounded-lg font-semibold transition-all ${
                        selectedColor === color
                          ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                          : 'border-gray-200 hover:border-gray-400 text-gray-900'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

           
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
                >
                  −
                </button>
                <span className="text-lg font-semibold w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
                >
                  +
                </button>
              </div>
            </div>

           
            <div className="flex gap-3 mb-8">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 bg-black hover:bg-gray-900 text-white h-14 rounded-xl text-base font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {addingToCart ? 'Adding...' : 'Add to cart'}
              </button>
              
              {/* Wishlist Button */}
              <button
                onClick={toggleWishlist}
                className={`h-14 px-5 rounded-xl transition-all shadow-lg ${
                  isWishlisted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-0'
                    : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200'
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isWishlisted ? 'fill-white text-white' : 'text-gray-700'
                  }`}
                />
              </button>
            </div>

            
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Product Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {product.sizes && product.sizes.length > 0 && (
                  <p>Available Sizes: {product.sizes.join(', ')}</p>
                )}
                {product.colors && product.colors.length > 0 && (
                  <p>Available Colors: {product.colors.join(', ')}</p>
                )}
                <p>Category: {product.category?.name || 'Uncategorized'}</p>
              </div>
            </div>

            
            <div className="grid grid-cols-1 gap-4 pt-8 border-t border-gray-200">
              
              {/* Free Shipping */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gray-100 rounded-lg">
                  <Truck className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-600">On orders over $50</p>
                </div>
              </div>
              
             
             
              
              {/* Secure Payment */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gray-100 rounded-lg">
                  <Shield className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Secure Payment</p>
                  <p className="text-xs text-gray-600">100% protected checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="mt-16 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            
            {/* Left Column */}
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-900">Material:</span>
                <span className="text-gray-600 ml-2">100% Organic Cotton</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Fit:</span>
                <span className="text-gray-600 ml-2">Regular fit, true to size</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Care:</span>
                <span className="text-gray-600 ml-2">Machine wash cold</span>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-3">
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <span className="font-semibold text-gray-900">Sizes:</span>
                  <span className="text-gray-600 ml-2">{product.sizes.join(', ')}</span>
                </div>
              )}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="font-semibold text-gray-900">Colors:</span>
                  <span className="text-gray-600 ml-2">{product.colors.join(', ')}</span>
                </div>
              )}
              <div>
                <span className="font-semibold text-gray-900">Category:</span>
                <span className="text-gray-600 ml-2">{product.category?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
