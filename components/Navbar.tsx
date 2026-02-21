

// 'use client'

// import Link from 'next/link'
// import Image from 'next/image'
// import { useState } from 'react'
// import { useSession, signOut } from 'next-auth/react'
// import { ShoppingCart, Search, User, Menu, X, LogOut, Heart, Package } from 'lucide-react'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

// export default function Navbar() {
//   const { data: session, status } = useSession()
//   const [search, setSearch] = useState('')
//   const [mobileOpen, setMobileOpen] = useState(false)

//   const cartCount = 0 // connect later to actual cart

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!search.trim()) return
//     window.location.href = `/shop?search=${encodeURIComponent(search)}`
//     setMobileOpen(false)
//   }

//   return (
//     <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
//         {/* Main Navbar */}
//         <div className="py-4 flex items-center justify-between gap-4">

//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2 group">
//             <div className="relative">
//               <Image
//                 src="/na.jpeg"
//                 alt="Clothify Logo"
//                 width={48}
//                 height={48}
//                 className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all duration-300"
//                 priority
//               />
//             </div>
//             <span className="hidden sm:block text-xl font-bold text-gray-900">
//               Clothify
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center gap-1">
//             {[
//               { href: '/', label: 'Home' },
//               { href: '/shop', label: 'Shop' },
//               { href: '/men', label: 'Men' },
//               { href: '/women', label: 'Women' },
//               { href: '/bags', label: 'Bags' },
//             ].map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Search */}
//           <div className="hidden md:flex items-center flex-1 max-w-md">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input
//                 placeholder="Search for products..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     handleSearch(e)
//                   }
//                 }}
//                 className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-gray-300 transition-all"
//               />
//             </div>
//           </div>

//           {/* Right Actions (Desktop) */}
//           <div className="hidden md:flex items-center gap-2">
//             {/* Wishlist */}
//             <Button 
//               variant="ghost" 
//               size="icon"
//               className="relative hover:bg-gray-100 transition-all"
//             >
//               <Heart className="w-5 h-5" />
//             </Button>

//             {/* Cart */}
//             <Link href="/cart">
//               <Button 
//                 variant="ghost" 
//                 size="icon"
//                 className="relative hover:bg-gray-100 transition-all"
//               >
//                 <ShoppingCart className="w-5 h-5" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
//                     {cartCount}
//                   </span>
//                 )}
//               </Button>
//             </Link>

//             {/* Auth */}
//             {status === 'loading' ? (
//               <div className="w-24 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
//             ) : !session ? (
//               <div className="flex gap-2">
//                 <Link href="/auth/login">
//                   <Button variant="outline" className="border-gray-300 hover:border-gray-400">
//                     Login
//                   </Button>
//                 </Link>
//                 <Link href="/auth/signup">
//                   <Button className="bg-gray-900 hover:bg-gray-800">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                     {session.user?.email?.[0].toUpperCase()}
//                   </div>
//                   <div className="hidden xl:block">
//                     <p className="text-xs text-gray-500">Welcome back</p>
//                     <p className="text-sm font-medium text-gray-900 max-w-[120px] truncate">
//                       {session.user?.email}
//                     </p>
//                   </div>
//                 </div>
//                 <Button 
//                   variant="ghost" 
//                   size="icon"
//                   onClick={() => signOut()}
//                   className="hover:bg-red-50 hover:text-red-600"
//                   title="Logout"
//                 >
//                   <LogOut className="w-4 h-4" />
//                 </Button>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             onClick={() => setMobileOpen(!mobileOpen)}
//           >
//             {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileOpen && (
//         <div className="md:hidden border-t bg-white">
//           <div className="px-4 py-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">

//             {/* Mobile Search */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     handleSearch(e)
//                   }
//                 }}
//                 className="pl-10 bg-gray-50"
//               />
//             </div>

//             {/* Mobile Navigation Links */}
//             <nav className="space-y-1">
//               {[
//                 { href: '/', label: 'Home', icon: '🏠' },
//                 { href: '/shop', label: 'Shop', icon: '🛍️' },
//                 { href: '/men', label: 'Men', icon: '👔' },
//                 { href: '/women', label: 'Women', icon: '👗' },
//                 { href: '/bags', label: 'Bags', icon: '👜' },
//               ].map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   onClick={() => setMobileOpen(false)}
//                   className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
//                 >
//                   <span className="text-lg">{link.icon}</span>
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>

//             {/* Mobile Quick Actions */}
//             <div className="grid grid-cols-2 gap-2 pt-2 border-t">
//               <Link href="/cart" onClick={() => setMobileOpen(false)}>
//                 <Button 
//                   variant="outline" 
//                   className="w-full justify-start gap-2"
//                 >
//                   <ShoppingCart className="w-4 h-4" />
//                   Cart
//                   {cartCount > 0 && (
//                     <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
//                       {cartCount}
//                     </span>
//                   )}
//                 </Button>
//               </Link>
//               {/* <Button 
//                 variant="outline" 
//                 className="w-full justify-start gap-2"
//               >
//                 <Heart className="w-4 h-4" />
//                 Wishlist
//               </Button> */}


//               <Link href="/wishlist">
//   <Button 
//     variant="outline" 
//     className="w-full justify-start gap-2"
//   >
//     <Heart className="w-4 h-4" />
//     Wishlist
//   </Button>
// </Link>
//             </div>

//             {/* Mobile Auth */}
//             {status === 'loading' ? (
//               <div className="w-full h-12 bg-gray-100 rounded-lg animate-pulse"></div>
//             ) : !session ? (
//               <div className="space-y-2 pt-2 border-t">
//                 <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
//                   <Button className="w-full" variant="outline">
//                     Login
//                   </Button>
//                 </Link>
//                 <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
//                   <Button className="w-full bg-gray-900 hover:bg-gray-800">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="pt-2 border-t space-y-3">
//                 <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg">
//                   <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
//                     {session.user?.email?.[0].toUpperCase()}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs text-gray-500">Logged in as</p>
//                     <p className="text-sm font-medium text-gray-900 truncate">
//                       {session.user?.email}
//                     </p>
//                   </div>
//                 </div>
//                 <Button
//                   variant="outline"
//                   className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
//                   onClick={() => {
//                     signOut()
//                     setMobileOpen(false)
//                   }}
//                 >
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Logout
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }




'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, Search, User, Menu, X, LogOut, Heart, Package } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Navbar() {
  const { data: session, status } = useSession()
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [wishlistCount, setWishlistCount] = useState(0)

  const cartCount = 0 

  
  useEffect(() => {
    const loadWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
      setWishlistCount(wishlist.length)
    }
    
    loadWishlistCount()
    
  
    window.addEventListener('storage', loadWishlistCount)
    return () => window.removeEventListener('storage', loadWishlistCount)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!search.trim()) return
    window.location.href = `/shop?search=${encodeURIComponent(search)}`
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Navbar */}
        <div className="py-4 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Image
                src="/na.jpeg"
                alt="Clothify Logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all duration-300"
                priority
              />
            </div>
            <span className="hidden sm:block text-xl font-bold text-gray-900">
              Clothify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/shop', label: 'Shop' },
              { href: '/men', label: 'Men' },
              { href: '/women', label: 'Women' },
              { href: '/bags', label: 'Bags' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e)
                  }
                }}
                className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-gray-300 transition-all"
              />
            </div>
          </div>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            
            {/* Wishlist with Count */}
            <Link href="/wishlist">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative hover:bg-gray-100 transition-all"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative hover:bg-gray-100 transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {status === 'loading' ? (
              <div className="w-24 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
            ) : !session ? (
              <div className="flex gap-2">
                <Link href="/auth/login">
                  <Button variant="outline" className="border-gray-300 hover:border-gray-400">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-gray-900 hover:bg-gray-800">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {session.user?.email?.[0].toUpperCase()}
                  </div>
                  <div className="hidden xl:block">
                    <p className="text-xs text-gray-500">Welcome back</p>
                    <p className="text-sm font-medium text-gray-900 max-w-[120px] truncate">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => signOut()}
                  className="hover:bg-red-50 hover:text-red-600"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">

            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e)
                  }
                }}
                className="pl-10 bg-gray-50"
              />
            </div>

            {/* Mobile Navigation Links */}
            <nav className="space-y-1">
              {[
                { href: '/', label: 'Home', icon: '🏠' },
                { href: '/shop', label: 'Shop', icon: '🛍️' },
                { href: '/men', label: 'Men', icon: '👔' },
                { href: '/women', label: 'Women', icon: '👗' },
                { href: '/bags', label: 'Bags', icon: '👜' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t">
              <Link href="/cart" onClick={() => setMobileOpen(false)}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link href="/wishlist" onClick={() => setMobileOpen(false)}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="ml-auto bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile Auth */}
            {status === 'loading' ? (
              <div className="w-full h-12 bg-gray-100 rounded-lg animate-pulse"></div>
            ) : !session ? (
              <div className="space-y-2 pt-2 border-t">
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="pt-2 border-t space-y-3">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
                    {session.user?.email?.[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Logged in as</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                  onClick={() => {
                    signOut()
                    setMobileOpen(false)
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}