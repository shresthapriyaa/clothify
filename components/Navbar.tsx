
'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <div className="font-bold text-xl">YourShop</div>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/men">Men</Link>
        <Link href="/women">Women</Link>
        <Link href="/bags">Bags</Link>
        <Link href="/cart">Cart</Link>
      </div>
    </nav>
  );
}
