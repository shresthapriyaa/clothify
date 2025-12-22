
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">Clothify</h2>
          <p className="text-sm">
            Your one-stop shop for men, women, and bags.
          </p>
        </div>

        
        <div>
          <h3 className="text-white font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/men" className="hover:text-white">Men</Link></li>
            <li><Link href="/women" className="hover:text-white">Women</Link></li>
            <li><Link href="/bags" className="hover:text-white">Bags</Link></li>
            <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-white font-semibold mb-3">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link href="/checkout" className="hover:text-white">Checkout</Link></li>
            <li><Link href="/orders" className="hover:text-white">My Orders</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 text-center text-sm py-4">
        © {new Date().getFullYear()} Clothify. All rights reserved.
      </div>
    </footer>
  );
}

