// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }











// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ShoppingBag } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: {
//     id: string;
//     name: string;
//   };
//   sizes: string[];
//   colors: string[];
//   isBest: boolean;
//   isPopular: boolean;
//   isSale: boolean;
// }

// export default function HomePage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('/api/products');
//       const data = await res.json();
      
//       let productsArray: Product[] = [];
      
//       if (Array.isArray(data)) {
//         productsArray = data;
//       } else if (data.products && Array.isArray(data.products)) {
//         productsArray = data.products;
//       } else if (data.data && Array.isArray(data.data)) {
//         productsArray = data.data;
//       }
      
//       setProducts(productsArray);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setProducts([]);
//       setLoading(false);
//     }
//   };

//   const bestSale = Array.isArray(products) ? products.filter(p => p.isSale).slice(0, 4) : [];
//   const popular = Array.isArray(products) ? products.filter(p => p.isPopular).slice(0, 4) : [];
//   const bestChoice = Array.isArray(products) ? products.filter(p => p.isBest).slice(0, 4) : [];

//   const ProductCard = ({ product }: { product: Product }) => (
//     <Link href={`/products/${product.id}`} className="group block">
//       <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
//         <div className="relative aspect-square bg-gray-100">
//           {product.image ? (
//             <Image
//               src={product.image}
//               alt={product.name}
//               fill
//               className="object-cover group-hover:scale-105 transition duration-300"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Image
//             </div>
//           )}
          
//           {product.isSale && (
//             <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//               Sale
//             </span>
//           )}
//         </div>
        
//         <div className="p-4">
//           <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
//             {product.name}
//           </h3>
//           <p className="text-lg font-bold text-gray-900">${product.price}</p>
//         </div>
//       </div>
//     </Link>
//   );

//   const ProductSection = ({ 
//     title, 
//     products 
//   }: { 
//     title: string; 
//     products: Product[];
//   }) => (
//     <section className="mb-12">
//       <h2 className="text-2xl font-bold mb-6">{title}</h2>
      
//       {loading ? (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="animate-pulse">
//               <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
//               <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//             </div>
//           ))}
//         </div>
//       ) : products.length === 0 ? (
//         <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-600">
//           No products available
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </section>
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar/>
//       {/* Hero Section */}
//       <section className="bg-gray-100 ">
//         <div className='flex flex-1 items-center'>
//           <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <div>
//               <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
//                 Discover Your Style
//               </h1>
              
//               <p className="text-lg text-gray-600 mb-6">
//                 Shop the latest trends in fashion. Quality clothing for men and women.
//               </p>

//               <Link 
//                 href="/shop"
//                 className="inline-flex  items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition" 
               
//               >
//                 Shop Now
//                 <ShoppingBag className="w-5 h-5" />
//               </Link>
//             </div>
//                  <div className="relative aspect-square md:aspect-video overflow-hidden">
//               <Image
//                 src="/Moda.jpeg"
//                 alt="Fashion Collection"
//                 fill
//                 className="object-contain h-full  "
//                 priority
//               />
//             </div>
//             </div>

           
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
        
//         {/* Best Sale */}
//         <ProductSection 
//           title="Best Sale" 
//           products={bestSale}
//         />

//         {/* Popular */}
//         <ProductSection 
//           title="Popular" 
//           products={popular}
//         />

//         {/* Best Choice */}
//         <ProductSection 
//           title="Best Choice" 
//           products={bestChoice}
//         />

        
        



//         {/* Categories with Images */}
// <section className="my-16">
//   <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//     {[
//       { 
//         name: 'Men', 
//         href: '/men',
//         image: '/Mens.jpeg'
//       },
//       { 
//         name: 'Women', 
//         href: '/women',
//         image: '/Hero.jpeg'
//       },
//       { 
//         name: 'Bags', 
//         href: '/bags',
//         image: '/Bag.jpeg'
//       }
//     ].map((category) => (
//       <Link
//         key={category.name}
//         href={category.href}
//         className="group relative h-64 rounded-xl overflow-hidden"
//       >
//         <Image
//           src={category.image}
//           alt={category.name}
//           fill
//           className="object-cover group-hover:scale-110 transition duration-500"
//         />
//         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <h3 className="text-3xl font-bold text-white">
//             {category.name}
//           </h3>
//         </div>
//       </Link>
//     ))}
//   </div>
// </section>

//         {/* CTA */}
//         <section className="bg-gray-900 text-white rounded-lg p-8 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold mb-3">
//             Ready to Shop?
//           </h2>
//           <p className="text-gray-300 mb-6">
//             Browse our complete collection of quality products.
//           </p>
//           <Link 
//             href="/shop"
//             className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
//           >
//             View All Products
//           </Link>
//         </section>
//       </div>
//       <Footer/>
//     </div>
//   );
// }












// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ShoppingBag } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: {
//     id: string;
//     name: string;
//   };
//   sizes: string[];
//   colors: string[];
//   isBest: boolean;
//   isPopular: boolean;
//   isSale: boolean;
// }

// export default function HomePage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('/api/products');
//       const data = await res.json();
      
//       let productsArray: Product[] = [];
      
//       if (Array.isArray(data)) {
//         productsArray = data;
//       } else if (data.products && Array.isArray(data.products)) {
//         productsArray = data.products;
//       } else if (data.data && Array.isArray(data.data)) {
//         productsArray = data.data;
//       }
      
//       setProducts(productsArray);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setProducts([]);
//       setLoading(false);
//     }
//   };

//   const bestSale = Array.isArray(products) ? products.filter(p => p.isSale).slice(0, 4) : [];
//   const popular = Array.isArray(products) ? products.filter(p => p.isPopular).slice(0, 4) : [];
//   const bestChoice = Array.isArray(products) ? products.filter(p => p.isBest).slice(0, 4) : [];

//   const ProductCard = ({ product }: { product: Product }) => (
//     <Link href={`/products/${product.id}`} className="group block">
//       <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
//         <div className="relative aspect-square bg-gray-100">
//           {product.image ? (
//             <Image
//               src={product.image}
//               alt={product.name}
//               fill
//               className="object-cover group-hover:scale-105 transition duration-300"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Image
//             </div>
//           )}
          
//           {product.isSale && (
//             <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//               Sale
//             </span>
//           )}
//         </div>
        
//         <div className="p-4">
//           <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
//             {product.name}
//           </h3>
//           <p className="text-lg font-bold text-gray-900">${product.price}</p>
//         </div>
//       </div>
//     </Link>
//   );

//   const ProductSection = ({ 
//     title, 
//     products 
//   }: { 
//     title: string; 
//     products: Product[];
//   }) => (
//     <section className="mb-12">
//       <h2 className="text-2xl font-bold mb-6">{title}</h2>
      
//       {loading ? (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="animate-pulse">
//               <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
//               <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//             </div>
//           ))}
//         </div>
//       ) : products.length === 0 ? (
//         <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-600">
//           No products available
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </section>
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar/>
//       {/* Hero Section */}
//       <section className="bg-gray-900 text-white  ">
//         <div className='flex flex-1 items-center'>
//           <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <div>
//               <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray">
//                 Discover Your Style
//               </h1>
              
//               <p className="text-lg text-gray mb-6">
//                 Shop the latest trends in fashion. Quality clothing for men and women.
//               </p>

//               <Link 
//                 href="/shop"
//                 className="inline-flex  items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition" 
               
//               >
//                 Shop Now
//                 <ShoppingBag className="w-5 h-5" />
//               </Link>
//             </div>
//                  <div className="relative aspect-square md:aspect-video overflow-hidden">
//               <Image
//                 src="/Moda.jpeg"
//                 alt="Fashion Collection"
//                 fill
//                 className="object-cover h-full w-full rounded-lg "
//                 priority
//               />
//             </div>
//             </div>

           
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
        
//         {/* Best Sale */}
//         <ProductSection 
//           title="Best Sale" 
//           products={bestSale}
//         />

//         {/* Popular */}
//         <ProductSection 
//           title="Popular" 
//           products={popular}
//         />

//         {/* Best Choice */}
//         <ProductSection 
//           title="Best Choice" 
//           products={bestChoice}
//         />

        
        



//         {/* Categories with Images */}
// <section className="my-16">
//   <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//     {[
//       { 
//         name: 'Men', 
//         href: '/men',
//         image: '/Mens.jpeg'
//       },
//       { 
//         name: 'Women', 
//         href: '/women',
//         image: '/Hero.jpeg'
//       },
//       { 
//         name: 'Bags', 
//         href: '/bags',
//         image: '/Bag.jpeg'
//       }
//     ].map((category) => (
//       <Link
//         key={category.name}
//         href={category.href}
//         className="group relative h-64 rounded-xl overflow-hidden"
//       >
//         <Image
//           src={category.image}
//           alt={category.name}
//           fill
//           className="object-cover group-hover:scale-110 transition duration-500"
//         />
//         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <h3 className="text-3xl font-bold text-white">
//             {category.name}
//           </h3>
//         </div>
//       </Link>
//     ))}
//   </div>
// </section>

//         {/* CTA */}
//         <section className="bg-gray-900 text-white rounded-lg p-8 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold mb-3">
//             Ready to Shop?
//           </h2>
//           <p className="text-gray-300 mb-6">
//             Browse our complete collection of quality products.
//           </p>
//           <Link 
//             href="/shop"
//             className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
//           >
//             View All Products
//           </Link>
//         </section>
//       </div>
//       <Footer/>
//     </div>
//   );
// }




// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ShoppingBag, ArrowRight, Truck, Shield, CreditCard } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: {
//     id: string;
//     name: string;
//   };
//   sizes: string[];
//   colors: string[];
//   isBest: boolean;
//   isPopular: boolean;
//   isSale: boolean;
// }

// export default function HomePage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('/api/products');
//       const data = await res.json();
      
//       let productsArray: Product[] = [];
      
//       if (Array.isArray(data)) {
//         productsArray = data;
//       } else if (data.products && Array.isArray(data.products)) {
//         productsArray = data.products;
//       } else if (data.data && Array.isArray(data.data)) {
//         productsArray = data.data;
//       }
      
//       setProducts(productsArray);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setProducts([]);
//       setLoading(false);
//     }
//   };

//   const bestSale = Array.isArray(products) ? products.filter(p => p.isSale).slice(0, 4) : [];
//   const popular = Array.isArray(products) ? products.filter(p => p.isPopular).slice(0, 4) : [];
//   const bestChoice = Array.isArray(products) ? products.filter(p => p.isBest).slice(0, 4) : [];

//   const ProductCard = ({ product }: { product: Product }) => (
//     <Link href={`/products/${product.id}`} className="group block">
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//         <div className="relative aspect-square bg-gray-50">
//           {product.image ? (
//             <Image
//               src={product.image}
//               alt={product.name}
//               fill
//               className="object-cover group-hover:scale-110 transition duration-500"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Image
//             </div>
//           )}
          
//           {product.isSale && (
//             <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
//               SALE
//             </span>
//           )}
//         </div>
        
//         <div className="p-5">
//           <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
//             {product.name}
//           </h3>
//           <div className="flex items-center justify-between">
//             <p className="text-xl font-bold text-gray-900">${product.price}</p>
//             <span className="text-sm text-gray-500">View Details</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );

//   const ProductSection = ({ 
//     title, 
//     products 
//   }: { 
//     title: string; 
//     products: Product[];
//   }) => (
//     <section className="mb-16">
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
//         <Link href="/shop" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
//           View All <ArrowRight className="w-4 h-4" />
//         </Link>
//       </div>
      
//       {loading ? (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="animate-pulse">
//               <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
//               <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//             </div>
//           ))}
//         </div>
//       ) : products.length === 0 ? (
//         <div className="bg-gray-50 rounded-xl p-12 text-center text-gray-600">
//           No products available
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </section>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar/>
      
//       {/* Promotional Banner */}
//       <section className="relative bg-gradient-to-r from-blue-50 to-purple-50 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="text-center">
//             <p className="text-sm md:text-base font-medium text-gray-800">
//               🎉 <span className="font-bold">20% OFF</span> on your first order! Use code: <span className="font-bold text-blue-600">WELCOME20</span>
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Hero Section - Matching the screenshot style */}
//       <section className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-white overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
//           <div className="relative bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl">
//             <div className="grid md:grid-cols-2 gap-0 items-center">
              
//               {/* Text Content - Left Side */}
//               <div className="p-8 md:p-12 lg:p-16 z-10">
//                 <div className="space-y-6">
//                   <div>
//                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
//                       20% OFF ONLY TODAY AND
//                       <span className="block mt-2">GET SPECIAL GIFT!</span>
//                     </h1>
//                   </div>
                  
//                   <p className="text-base md:text-lg text-gray-700 max-w-md">
//                     Today only, enjoy a stylish 20% off and receive an exclusive gift! Elevate your wardrobe now! ✨
//                   </p>

//                   <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                     <Link 
//                       href="/shop"
//                       className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl" 
//                     >
//                       Shop Now
//                       <ShoppingBag className="w-5 h-5" />
//                     </Link>
                    
//                     <Link 
//                       href="/shop"
//                       className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300" 
//                     >
//                       Learn More
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               {/* Image - Right Side */}
//               <div className="relative h-80 md:h-96 lg:h-[700px]">
//                 <Image
//                   src="/Fashion.jpeg"
//                   alt="Fashion Model"
//                   fill
//                   className="object-cover object-center h-full w-full"
//                   priority
//                 />
//               </div>

//             </div>

//             {/* Decorative wave pattern */}
//             <div className="absolute inset-0 pointer-events-none">
//               <div className="absolute top-0 left-0 w-full h-full opacity-10">
//                 <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
//                 <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-2xl"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>



//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-16">
        
//         {/* Best Sale */}
//         <ProductSection 
//           title="Best Sale" 
//           products={bestSale}
//         />

//         {/* Popular */}
//         <ProductSection 
//           title="Popular Products" 
//           products={popular}
//         />

//         {/* Categories Section */}
//         <section className="mb-16">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               { 
//                 name: 'Men', 
//                 href: '/men',
//                 image: '/Mens.jpeg',
//                 items: '250+ Items'
//               },
//               { 
//                 name: 'Women', 
//                 href: '/women',
//                 image: '/Hero.jpeg',
//                 items: '350+ Items'
//               },
//               { 
//                 name: 'Bags', 
//                 href: '/bags',
//                 image: '/Bag.jpeg',
//                 items: '150+ Items'
//               }
//             ].map((category) => (
//               <Link
//                 key={category.name}
//                 href={category.href}
//                 className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
//               >
//                 <Image
//                   src={category.image}
//                   alt={category.name}
//                   fill
//                   className="object-cover group-hover:scale-110 transition duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                   <h3 className="text-3xl font-bold mb-2">
//                     {category.name}
//                   </h3>
//                   <p className="text-sm text-gray-200 mb-3">{category.items}</p>
//                   <span className="inline-flex items-center text-sm font-semibold">
//                     Shop Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition" />
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Best Choice */}
//         <ProductSection 
//           title="Best Choice" 
//           products={bestChoice}
//         />

//         {/* Newsletter CTA */}
//         <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Stay Updated with Our Newsletter
//           </h2>
//           <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
//             Subscribe to get special offers, free giveaways, and exclusive deals delivered to your inbox.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//             <input 
//               type="email" 
//               placeholder="Enter your email"
//               className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
//             />
//             <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition whitespace-nowrap">
//               Subscribe
//             </button>
//           </div>
//         </section>
//       </div>
      
//       <Footer/>
//     </div>
//   );
// }





// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ShoppingBag, ArrowRight, Truck, Shield, CreditCard } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: {
//     id: string;
//     name: string;
//   };
//   sizes: string[];
//   colors: string[];
//   isBest: boolean;
//   isPopular: boolean;
//   isSale: boolean;
// }

// export default function HomePage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('/api/products');
//       const data = await res.json();
      
//       let productsArray: Product[] = [];
      
//       if (Array.isArray(data)) {
//         productsArray = data;
//       } else if (data.products && Array.isArray(data.products)) {
//         productsArray = data.products;
//       } else if (data.data && Array.isArray(data.data)) {
//         productsArray = data.data;
//       }
      
//       setProducts(productsArray);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setProducts([]);
//       setLoading(false);
//     }
//   };

//   const bestSale = Array.isArray(products) ? products.filter(p => p.isSale).slice(0, 4) : [];
//   const popular = Array.isArray(products) ? products.filter(p => p.isPopular).slice(0, 4) : [];
//   const bestChoice = Array.isArray(products) ? products.filter(p => p.isBest).slice(0, 4) : [];

//   const ProductCard = ({ product }: { product: Product }) => (
//     <Link href={`/products/${product.id}`} className="group block">
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//         <div className="relative aspect-square bg-gray-50">
//           {product.image ? (
//             <Image
//               src={product.image}
//               alt={product.name}
//               fill
//               className="object-cover group-hover:scale-110 transition duration-500"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Image
//             </div>
//           )}
          
//           {product.isSale && (
//             <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
//               SALE
//             </span>
//           )}
//         </div>
        
//         <div className="p-5">
//           <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
//             {product.name}
//           </h3>
//           <div className="flex items-center justify-between">
//             <p className="text-xl font-bold text-gray-900">${product.price}</p>
//             <span className="text-sm text-gray-500">View Details</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );

//   const ProductSection = ({ 
//     title, 
//     products 
//   }: { 
//     title: string; 
//     products: Product[];
//   }) => (
//     <section className="mb-16">
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
//         <Link href="/shop" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
//           View All <ArrowRight className="w-4 h-4" />
//         </Link>
//       </div>
      
//       {loading ? (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="animate-pulse">
//               <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
//               <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//             </div>
//           ))}
//         </div>
//       ) : products.length === 0 ? (
//         <div className="bg-gray-50 rounded-xl p-12 text-center text-gray-600">
//           No products available
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </section>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar/>
      
//       {/* Promotional Banner */}
//       {/* <section className="relative bg-gradient-to-r from-blue-50 to-purple-50 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="text-center">
//             <p className="text-sm md:text-base font-medium text-gray-800">
//                <span className="font-bold">20% OFF</span> on your first order! Use code: <span className="font-bold text-blue-600">WELCOME20</span>
//             </p>
//           </div>
//         </div>
//       </section> */}

//       {/* Hero Section - Matching the screenshot style */}
//       <section className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-white overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
//           <div className="relative bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl">
//             <div className="grid md:grid-cols-2 gap-0 items-center">
              
//               {/* Text Content - Left Side */}
//               <div className="p-8 md:p-12 lg:p-16 z-10">
//                 <div className="space-y-6">
//                   <div>
//                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
//                       20% OFF ONLY TODAY AND
//                       <span className="block mt-2">GET SPECIAL GIFT!</span>
//                     </h1>
//                   </div>
                  
//                   <p className="text-base md:text-lg text-gray-700 max-w-md">
//                     Today only, enjoy a stylish 20% off and receive an exclusive gift! Elevate your wardrobe now! ✨
//                   </p>

//                   <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                     <Link 
//                       href="/shop"
//                       className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl" 
//                     >
//                       Shop Now
//                       <ShoppingBag className="w-5 h-5" />
//                     </Link>
                    
//                     <Link 
//                       href="/shop"
//                       className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300" 
//                     >
//                       Learn More
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               {/* Image - Right Side */}
//               <div className="relative h-80 md:h-96 lg:h-[700px]">
//                 <Image
//                   src="/Moda.jpeg"
//                   alt="Fashion Model"
//                   fill
//                   className="object-cover object-center"
//                   priority
//                 />
//               </div>

//             </div>

//             {/* Decorative wave pattern */}
//             <div className="absolute inset-0 pointer-events-none">
//               <div className="absolute top-0 left-0 w-full h-full opacity-10">
//                 <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
//                 <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-2xl"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>



//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-16">
        
//         {/* Best Sale */}
//         <ProductSection 
//           title="Best Sale" 
//           products={bestSale}
//         />

//         {/* Popular */}
//         <ProductSection 
//           title="Popular Products" 
//           products={popular}
//         />

//         {/* Categories Section */}
//         <section className="mb-16">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               { 
//                 name: 'Men', 
//                 href: '/men',
//                 image: '/Mens.jpeg',
//                 items: '250+ Items'
//               },
//               { 
//                 name: 'Women', 
//                 href: '/women',
//                 image: '/Hero.jpeg',
//                 items: '350+ Items'
//               },
//               { 
//                 name: 'Bags', 
//                 href: '/bags',
//                 image: '/Bag.jpeg',
//                 items: '150+ Items'
//               }
//             ].map((category) => (
//               <Link
//                 key={category.name}
//                 href={category.href}
//                 className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
//               >
//                 <Image
//                   src={category.image}
//                   alt={category.name}
//                   fill
//                   className="object-cover group-hover:scale-110 transition duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                   <h3 className="text-3xl font-bold mb-2">
//                     {category.name}
//                   </h3>
//                   <p className="text-sm text-gray-200 mb-3">{category.items}</p>
//                   <span className="inline-flex items-center text-sm font-semibold">
//                     Shop Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition" />
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Best Choice */}
//         <ProductSection 
//           title="Best Choice" 
//           products={bestChoice}
//         />

//         {/* Newsletter CTA */}
//         <section className="bg-gray-900 text-white rounded-2xl p-8 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold mb-3">
//             Ready to Shop?
//           </h2>
//           <p className="text-gray-300 mb-6">
//             Browse our complete collection of quality products.
//           </p>
//           <Link 
//             href="/shop"
//             className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
//           >
//             View All Products
//           </Link>
//         </section>
//       </div>
      
//       <Footer/>
//     </div>
//   );
// }









// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ShoppingBag } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: {
//     id: string;
//     name: string;
//   };
//   isBest: boolean;
//   isPopular: boolean;
//   isSale: boolean;
// }

// export default function HomePage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   // Get products from API
//   const loadProducts = async () => {
//     try {
//       const res = await fetch('/api/products');
//       const data = await res.json();
//       console.log('loaded products:', data); // debug
      
//       // Handle different response formats
//       if (Array.isArray(data)) {
//         setProducts(data);
//       } else if (data.data) {
//         setProducts(data.data);
//       } else if (data.products) {
//         setProducts(data.products);
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.log('Error:', error);
//       setProducts([]);
//       setLoading(false);
//     }
//   };

//   // Filter products for different sections
//   const saleProducts = products.filter(p => p.isSale).slice(0, 4);
//   const popularProducts = products.filter(p => p.isPopular).slice(0, 4);
//   const bestProducts = products.filter(p => p.isBest).slice(0, 4);

//   // Product card component
//   const ProductCard = ({ product }: { product: Product }) => (
//     <Link href={`/products/${product.id}`} className="group">
//       <div className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition">
//         <div className="relative aspect-square bg-gray-50">
//           {product.image ? (
//             <Image
//               src={product.image}
//               alt={product.name}
//               fill
//               className="object-cover group-hover:scale-105 transition"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Image
//             </div>
//           )}
          
//           {product.isSale && (
//             <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
//               SALE
//             </span>
//           )}
//         </div>
        
//         <div className="p-4">
//           <h3 className="font-semibold mb-2 line-clamp-2">
//             {product.name}
//           </h3>
//           <p className="text-xl font-bold">${product.price}</p>
//         </div>
//       </div>
//     </Link>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       {/* Hero Banner */}
//       <section className="bg-gradient-to-br from-gray-100 to-white">
//         <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
//           <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-xl">
//             <div className="grid md:grid-cols-2 items-center">
              
//               {/* Left - Text */}
//               <div className="p-8 md:p-12">
//                 <h1 className="text-4xl md:text-5xl font-bold mb-4">
//                   20% OFF ONLY TODAY AND
//                   <span className="block mt-2">GET SPECIAL GIFT!</span>
//                 </h1>
                
//                 <p className="text-lg text-gray-700 mb-6">
//                   Today only, enjoy a stylish 20% off and receive an exclusive gift! 
//                   Elevate your wardrobe now! ✨
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <Link 
//                     href="/shop"
//                     className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition"
//                   >
//                     Shop Now
//                     <ShoppingBag className="w-5 h-5" />
//                   </Link>
                  
//                   <Link 
//                     href="/shop"
//                     className="flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition"
//                   >
//                     Learn More
//                   </Link>
//                 </div>
//               </div>

//               {/* Right - Image */}
//               <div className="relative h-80 md:h-96 lg:h-[500px]">
//                 <Image
//                   src="/Moda.jpeg"
//                   alt="Fashion Model"
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//               </div>

//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products Section */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
        
//         {/* Best Sale */}
//         <section className="mb-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-3xl font-bold">Best Sale</h2>
//             <Link href="/shop" className="text-blue-600 hover:underline font-semibold">
//               View All →
//             </Link>
//           </div>
          
//           {loading ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[1,2,3,4].map(i => (
//                 <div key={i} className="animate-pulse">
//                   <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : saleProducts.length === 0 ? (
//             <div className="bg-white rounded-xl p-12 text-center text-gray-500">
//               No products on sale
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {saleProducts.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Popular */}
//         <section className="mb-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-3xl font-bold">Popular Products</h2>
//             <Link href="/shop" className="text-blue-600 hover:underline font-semibold">
//               View All →
//             </Link>
//           </div>
          
//           {loading ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[1,2,3,4].map(i => (
//                 <div key={i} className="animate-pulse">
//                   <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : popularProducts.length === 0 ? (
//             <div className="bg-white rounded-xl p-12 text-center text-gray-500">
//               No popular products yet
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {popularProducts.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Categories */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               { name: 'Men', href: '/men', image: '/Mens.jpeg' },
//               { name: 'Women', href: '/women', image: '/Hero.jpeg' },
//               { name: 'Bags', href: '/bags', image: '/Bag.jpeg' }
//             ].map(cat => (
//               <Link
//                 key={cat.name}
//                 href={cat.href}
//                 className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
//               >
//                 <Image
//                   src={cat.image}
//                   alt={cat.name}
//                   fill
//                   className="object-cover group-hover:scale-110 transition duration-500"
//                 />
//                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <h3 className="text-3xl font-bold text-white">{cat.name}</h3>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Best Choice */}
//         <section className="mb-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-3xl font-bold">Best Choice</h2>
//             <Link href="/shop" className="text-blue-600 hover:underline font-semibold">
//               View All →
//             </Link>
//           </div>
          
//           {loading ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[1,2,3,4].map(i => (
//                 <div key={i} className="animate-pulse">
//                   <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : bestProducts.length === 0 ? (
//             <div className="bg-white rounded-xl p-12 text-center text-gray-500">
//               No products yet
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {bestProducts.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* CTA Section */}
//         <section className="bg-gray-900 text-white rounded-2xl p-8 text-center">
//           <h2 className="text-3xl font-bold mb-3">Ready to Shop?</h2>
//           <p className="text-gray-300 mb-6">
//             Browse our complete collection of quality products.
//           </p>
//           <Link 
//             href="/shop"
//             className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
//           >
//             View All Products
//           </Link>
//         </section>
//       </div>
      
//       <Footer />
//     </div>
//   );
// }






// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ShoppingBag } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: {
//     id: string;
//     name: string;
//   };
//   isBest: boolean;
//   isPopular: boolean;
//   isSale: boolean;
// }

// export default function HomePage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   // Get products from API
//   const loadProducts = async () => {
//     try {
//       const res = await fetch('/api/products');
//       const data = await res.json();
//       console.log('loaded products:', data); // debug
      
//       // Handle different response formats
//       if (Array.isArray(data)) {
//         setProducts(data);
//       } else if (data.data) {
//         setProducts(data.data);
//       } else if (data.products) {
//         setProducts(data.products);
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.log('Error:', error);
//       setProducts([]);
//       setLoading(false);
//     }
//   };

//   // Filter products for different sections
//   const saleProducts = products.filter(p => p.isSale).slice(0, 4);
//   const popularProducts = products.filter(p => p.isPopular).slice(0, 4);
//   const bestProducts = products.filter(p => p.isBest).slice(0, 4);

//   // Product card component
//   const ProductCard = ({ product }: { product: Product }) => (
//     <Link href={`/products/${product.id}`}>
//       <div className="bg-white rounded-xl border overflow-hidden">
//         <div className="relative aspect-square bg-gray-50">
//           {product.image ? (
//             <Image
//               src={product.image}
//               alt={product.name}
//               fill
//               className="object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Image
//             </div>
//           )}
          
//           {product.isSale && (
//             <span className="absolute top-3 left-3  text-black text-xs px-3 py-1 rounded-full">
//               SALE
//             </span>
//           )}
//         </div>
        
//         <div className="p-4">
//           <h3 className="font-semibold mb-2 line-clamp-2">
//             {product.name}
//           </h3>
//           <p className="text-xl font-bold">${product.price}</p>
//         </div>
//       </div>
//     </Link>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       {/* Hero Banner */}
//       <section className="bg-white">
//         <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
//           <div className="bg-gray-300  rounded-2xl ">
//             <div className="grid md:grid-cols-2 items-center">
              
//               {/* Left - Text */}
//               <div className="p-8 md:p-12">
//                 <h1 className="text-4xl md:text-5xl font-bold mb-4">
//                   20% OFF ONLY TODAY AND
//                   <span className="block mt-2">GET SPECIAL GIFT!</span>
//                 </h1>
                
//                 <p className="text-lg text-gray-700 mb-6">
//                   Today only, enjoy a stylish 20% off and receive an exclusive gift! 
//                   Elevate your wardrobe now! 
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <Link 
//                     href="/shop"
//                     className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold"
//                   >
//                     Shop Now
//                     <ShoppingBag className="w-5 h-5" />
//                   </Link>
                  
                 
//                 </div>
//               </div>

//               {/* Right - Image */}
//               <div className="relative h-80 md:h-96 lg:h-[500px] ">
//                 <Image
//                   src="/Fashoin.jpeg"
//                   alt="Fashion Model"
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//               </div>

//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products Section */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
        
//         {/* Best Sale */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold mb-6">Best Sale</h2>
          
//           {loading ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[1,2,3,4].map(i => (
//                 <div key={i} className="animate-pulse">
//                   <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : saleProducts.length === 0 ? (
//             <div className="bg-white rounded-xl p-12 text-center text-gray-500">
//               No products on sale
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {saleProducts.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Popular */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold mb-6">Popular Products</h2>
          
//           {loading ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[1,2,3,4].map(i => (
//                 <div key={i} className="animate-pulse">
//                   <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : popularProducts.length === 0 ? (
//             <div className="bg-white rounded-xl p-12 text-center text-gray-500">
//               No popular products yet
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {popularProducts.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Categories */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               { name: 'Men', href: '/men', image: '/Mens.jpeg' },
//               { name: 'Women', href: '/women', image: '/Hero.jpeg' },
//               { name: 'Bags', href: '/bags', image: '/Bag.jpeg' }
//             ].map(cat => (
//               <Link
//                 key={cat.name}
//                 href={cat.href}
//                 className="relative h-64 rounded-2xl overflow-hidden"
//               >
//                 <Image
//                   src={cat.image}
//                   alt={cat.name}
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/40"></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <h3 className="text-3xl font-bold text-white">{cat.name}</h3>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Best Choice */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold mb-6">Best Choice</h2>
          
//           {loading ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[1,2,3,4].map(i => (
//                 <div key={i} className="animate-pulse">
//                   <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : bestProducts.length === 0 ? (
//             <div className="bg-white rounded-xl p-12 text-center text-gray-500">
//               No products yet
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {bestProducts.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* CTA Section */}
//         <section className="bg-gray-900 text-white rounded-2xl p-8 text-center">
//           <h2 className="text-3xl font-bold mb-3">Ready to Shop?</h2>
//           <p className="text-gray-300 mb-6">
//             Browse our complete collection of quality products.
//           </p>
//           <Link 
//             href="/shop"
//             className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold"
//           >
//             View All Products
//           </Link>
//         </section>
//       </div>
      
//       <Footer />
//     </div>
//   );
// }





// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ShoppingBag } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: {
//     id: string;
//     name: string;
//   };
//   isBest: boolean;
//   isPopular: boolean;
//   isSale: boolean;
// }

// export default function HomePage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   // Get products from API
//   const loadProducts = async () => {
//     try {
//       const res = await fetch('/api/products');
//       const data = await res.json();
//       console.log('loaded products:', data); // debug
      
//       // Handle different response formats
//       if (Array.isArray(data)) {
//         setProducts(data);
//       } else if (data.data) {
//         setProducts(data.data);
//       } else if (data.products) {
//         setProducts(data.products);
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.log('Error:', error);
//       setProducts([]);
//       setLoading(false);
//     }
//   };

//   // Filter products for different sections
//   const saleProducts = products.filter(p => p.isSale).slice(0, 4);
//   const popularProducts = products.filter(p => p.isPopular).slice(0, 4);
//   const bestProducts = products.filter(p => p.isBest).slice(0, 4);

//   // Product card component with hover effects
//   const ProductCard = ({ product }: { product: Product }) => (
//     <Link href={`/products/${product.id}`}>
//       <div className="bg-white rounded-xl border overflow-hidden transition-shadow duration-300 hover:shadow-xl">
//         <div className="relative aspect-square bg-gray-50 overflow-hidden group">
//           {product.image ? (
//             <Image
//               src={product.image}
//               alt={product.name}
//               fill
//               className="object-cover transition-transform duration-300 group-hover:scale-110"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Image
//             </div>
//           )}
          
//           {product.isSale && (
//             <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
//               SALE
//             </span>
//           )}
//           {product.isPopular && !product.isSale && (
//             <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
//               POPULAR
//             </span>
//           )}
//           {product.isBest && !product.isSale && !product.isPopular && (
//             <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
//               BEST
//             </span>
//           )}
//         </div>
        
//         <div className="p-4">
//           <h3 className="font-semibold mb-2 line-clamp-2 transition-colors duration-200 group-hover:text-gray-600">
//             {product.name}
//           </h3>
//           <p className="text-xl font-bold">${product.price}</p>
//         </div>
//       </div>
//     </Link>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       {/* Hero Banner */}
//       <section className="bg-white">
//         <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
//           <div className="bg-gray-100  rounded-2xl overflow-hidden">
//             <div className="grid md:grid-cols-2 items-center">
              
//               {/* Left - Text */}
//               <div className="p-8 md:p-12">
//                 <h1 className="text-4xl md:text-5xl font-bold mb-4">
//                   20% OFF ONLY TODAY AND
//                   <span className="block mt-2">GET SPECIAL GIFT!</span>
//                 </h1>
                
//                 <p className="text-lg text-gray-700 mb-6">
//                   Today only, enjoy a stylish 20% off and receive an exclusive gift! 
//                   Elevate your wardrobe now! 
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <Link 
//                     href="/shop"
//                     className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:scale-105"
//                   >
//                     Shop Now
//                     <ShoppingBag className="w-5 h-5" />
//                   </Link>
//                 </div>
//               </div>

//               {/* Right - Image */}
//               <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden group">
//                 <Image
//                   src="/Fashoin.jpeg"
//                   alt="Fashion Model"
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-105"
//                   priority
//                 />
//               </div>

//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products Section */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
        
//         {/* Best Sale */}
//         <section className="mb-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-3xl font-bold">Best Sale</h2>
//             <Link href="/shop" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               View All →
//             </Link>
//           </div>
          
//           {loading ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[1,2,3,4].map(i => (
//                 <div key={i} className="animate-pulse">
//                   <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : saleProducts.length === 0 ? (
//             <div className="bg-white rounded-xl p-12 text-center text-gray-500">
//               No products on sale
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {saleProducts.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Popular */}
//         <section className="mb-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-3xl font-bold">Popular Products</h2>
//             <Link href="/shop" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               View All →
//             </Link>
//           </div>
          
//           {loading ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[1,2,3,4].map(i => (
//                 <div key={i} className="animate-pulse">
//                   <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : popularProducts.length === 0 ? (
//             <div className="bg-white rounded-xl p-12 text-center text-gray-500">
//               No popular products yet
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {popularProducts.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Categories */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               { name: 'Men', href: '/men', image: '/Mens.jpeg' },
//               { name: 'Women', href: '/women', image: '/Hero.jpeg' },
//               { name: 'Bags', href: '/bags', image: '/Bag.jpeg' }
//             ].map(cat => (
//               <Link
//                 key={cat.name}
//                 href={cat.href}
//                 className="relative h-64 rounded-2xl overflow-hidden group"
//               >
//                 <Image
//                   src={cat.image}
//                   alt={cat.name}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/30"></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <h3 className="text-3xl font-bold text-white transition-transform duration-300 group-hover:scale-110">
//                     {cat.name}
//                   </h3>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Best Choice */}
//         <section className="mb-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-3xl font-bold">Best Choice</h2>
//             <Link href="/shop" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               View All →
//             </Link>
//           </div>
          
//           {loading ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[1,2,3,4].map(i => (
//                 <div key={i} className="animate-pulse">
//                   <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : bestProducts.length === 0 ? (
//             <div className="bg-white rounded-xl p-12 text-center text-gray-500">
//               No products yet
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {bestProducts.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </section>

//         {/* CTA Section */}
//         <section className="bg-gray-900 text-white rounded-2xl p-8 text-center transition-transform duration-300 hover:scale-[1.02]">
//           <h2 className="text-3xl font-bold mb-3">Ready to Shop?</h2>
//           <p className="text-gray-300 mb-6">
//             Browse our complete collection of quality products.
//           </p>
//           <Link 
//             href="/shop"
//             className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105"
//           >
//             View All Products
//           </Link>
//         </section>
//       </div>
      
//       <Footer />
//     </div>
//   );
// }












'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: {
    id: string;
    name: string;
  };
  isBest: boolean;
  isPopular: boolean;
  isSale: boolean;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  // Get products from API
  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      console.log('loaded products:', data); // debug
      
      // Handle different response formats
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data.data) {
        setProducts(data.data);
      } else if (data.products) {
        setProducts(data.products);
      }
      
      setLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setProducts([]);
      setLoading(false);
    }
  };

  // Filter products for different sections
  const saleProducts = products.filter(p => p.isSale).slice(0, 4);
  const popularProducts = products.filter(p => p.isPopular).slice(0, 4);
  const bestProducts = products.filter(p => p.isBest).slice(0, 4);

  // Product card component without hover effects and badges
  const ProductCard = ({ product }: { product: Product }) => (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl border overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xl font-bold">${product.price}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
          <div className="bg-gray-100 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              
              {/* Left - Text */}
              <div className="p-8 md:p-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  20% OFF ONLY TODAY AND
                  <span className="block mt-2">GET SPECIAL GIFT!</span>
                </h1>
                
                <p className="text-lg text-gray-700 mb-6">
                  Today only, enjoy a stylish 20% off and receive an exclusive gift! 
                  Elevate your wardrobe now! 
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/shop"
                    className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:scale-105"
                  >
                    Shop Now
                    <ShoppingBag className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Right - Image */}
              <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden">
                <Image
                  src="/Fashoin.jpeg"
                  alt="Fashion Model"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Best Sale */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Best Sale</h2>
            <Link href="/shop" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : saleProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center text-gray-500">
              No products on sale
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {saleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Popular */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Popular Products</h2>
            <Link href="/shop" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : popularProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center text-gray-500">
              No popular products yet
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {popularProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Men', href: '/men', image: '/Mens.jpeg' },
              { name: 'Women', href: '/women', image: '/Hero.jpeg' },
              { name: 'Bags', href: '/bags', image: '/Bag.jpeg' }
            ].map(cat => (
              <Link
                key={cat.name}
                href={cat.href}
                className="relative h-64 rounded-2xl overflow-hidden"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Best Choice */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Best Choice</h2>
            <Link href="/shop" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : bestProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center text-gray-500">
              No products yet
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bestProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white rounded-2xl p-8 text-center ]">
          <h2 className="text-3xl font-bold mb-3">Ready to Shop?</h2>
          <p className="text-gray-300 mb-6">
            Browse our complete collection of quality products.
          </p>
          <Link 
            href="/shop"
            className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-100"
          >
            View All Products
          </Link>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}