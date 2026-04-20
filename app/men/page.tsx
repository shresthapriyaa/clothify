"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WishlistButton from "@/components/WishlistButton";

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

export default function MenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
console.log(products)
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products?category=men");
      const data = await res.json();

      let productsArray: Product[] = [];

      if (Array.isArray(data)) {
        productsArray = data;
      } else if (data.products && Array.isArray(data.products)) {
        productsArray = data.products;
      } else if (data.data && Array.isArray(data.data)) {
        productsArray = data.data;
      }

      // Filter for men's products if API doesn't filter
      const menProducts = productsArray.filter(
        (p) => p.category.name.toLowerCase() === "men"
      );

      setProducts(menProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Men's Collection
          </h1>
          <p className="text-gray-600">Explore our latest men's fashion</p>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              No products found in this category
            </p>
            <Link href="/shop" className="text-gray-900 underline">
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block"
              >
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
                  <div className="relative aspect-square bg-gray-100">
                    {product.image ? (
                      <>
                        <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                      </>
                    
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-3 right-3 z-10">
                      <WishlistButton
                        product={product}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </p>
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
