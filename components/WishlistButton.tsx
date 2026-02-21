// 'use client';

// import { useState, useEffect } from 'react';
// import { Heart } from 'lucide-react';
// import { toast } from 'sonner';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: {
//     id: string;
//     name: string;
//   };
// }

// interface WishlistButtonProps {
//   product: Product;
//   className?: string;
//   showLabel?: boolean;
// }

// export default function WishlistButton({ 
//   product, 
//   className = '',
//   showLabel = false 
// }: WishlistButtonProps) {
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     checkWishlistStatus();
//   }, [product.id]);

//   const checkWishlistStatus = () => {
//     try {
//       const saved = localStorage.getItem('wishlist');
//       if (saved) {
//         const wishlist: Product[] = JSON.parse(saved);
//         setIsInWishlist(wishlist.some(item => item.id === product.id));
//       }
//     } catch (error) {
//       console.error('Error checking wishlist:', error);
//     }
//   };

//   const toggleWishlist = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     setLoading(true);
    
//     try {
//       const saved = localStorage.getItem('wishlist');
//       let wishlist: Product[] = saved ? JSON.parse(saved) : [];

//       if (isInWishlist) {
//         // Remove from wishlist
//         wishlist = wishlist.filter(item => item.id !== product.id);
//         localStorage.setItem('wishlist', JSON.stringify(wishlist));
//         setIsInWishlist(false);
//         toast.success('Removed from wishlist');
//       } else {
//         // Add to wishlist
//         wishlist.push(product);
//         localStorage.setItem('wishlist', JSON.stringify(wishlist));
//         setIsInWishlist(true);
//         toast.success('Added to wishlist');
//       }
      
//       // Dispatch custom event to update wishlist count in navbar
//       window.dispatchEvent(new Event('wishlistUpdated'));
//     } catch (error) {
//       console.error('Error updating wishlist:', error);
//       toast.error('Failed to update wishlist');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={toggleWishlist}
//       disabled={loading}
//       className={`group flex items-center justify-center gap-2 transition ${className}`}
//       title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
//     >
//       <Heart
//         className={`w-5 h-5 transition ${
//           isInWishlist
//             ? 'fill-red-500 text-red-500'
//             : 'text-gray-600 group-hover:text-red-500'
//         } ${loading ? 'opacity-50' : ''}`}
//       />
//       {showLabel && (
//         <span className="text-sm font-medium">
//           {isInWishlist ? 'Saved' : 'Save'}
//         </span>
//       )}
//     </button>
//   );
// }






'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
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
}

interface WishlistButtonProps {
  product: Product;
  className?: string;
  showLabel?: boolean;
}

export default function WishlistButton({ 
  product, 
  className = '',
  showLabel = false 
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
    
    // Listen for wishlist updates from other components
    const handleWishlistUpdate = () => {
      checkWishlistStatus();
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    window.addEventListener('storage', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
      window.removeEventListener('storage', handleWishlistUpdate);
    };
  }, [product.id]);

  const checkWishlistStatus = () => {
    try {
      const saved = localStorage.getItem('wishlist');
      if (saved) {
        const wishlist: Product[] = JSON.parse(saved);
        setIsInWishlist(wishlist.some(item => item.id === product.id));
      }
    } catch (error) {
      console.log('Error checking wishlist:', error);
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const saved = localStorage.getItem('wishlist');
      let wishlist: Product[] = saved ? JSON.parse(saved) : [];

      if (isInWishlist) {
        // Remove from wishlist
        wishlist = wishlist.filter(item => item.id !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        // Add to wishlist
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(true);
        toast.success('Added to wishlist');
      }
      
      // Trigger event to update other components
      window.dispatchEvent(new Event('wishlistUpdated'));
      window.dispatchEvent(new Event('storage'));
      
    } catch (error) {
      console.log('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`flex items-center justify-center gap-2 ${className}`}
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={`w-5 h-5 ${
          isInWishlist
            ? 'fill-red-500 text-red-500'
            : 'text-gray-600'
        }`}
      />
      {showLabel && (
        <span className="text-sm font-medium">
          {isInWishlist ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}