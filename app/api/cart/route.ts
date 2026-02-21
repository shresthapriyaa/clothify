
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Utility: fetch cart items with product details
async function getCartItemsWithProducts(cartId: string) {
  const cartItems = await prisma.cartItem.findMany({
    where: { cartId },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
        },
      },
    },
  });

  return cartItems;
}

// POST: create a cart for a user if not exists
export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    
    // If no userId provided, use guest ID from cookie
    const guestId = userId || req.cookies.get('guestId')?.value || `guest-${Date.now()}`;
    
    let cart = await prisma.cart.findFirst({ 
      where: { userId: guestId } 
    });
    
    if (!cart) {
      cart = await prisma.cart.create({ 
        data: { userId: guestId } 
      });
    }

    const items = await getCartItemsWithProducts(cart.id);

    const response = NextResponse.json({ 
      cartId: cart.id, 
      items 
    });

    // Set guest ID cookie if not exists
    if (!req.cookies.get('guestId')) {
      response.cookies.set('guestId', guestId, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        sameSite: 'lax',
      });
    }

    return response;
  } catch (error) {
    console.error('Error creating cart:', error);
    return NextResponse.json(
      { error: 'Failed to create cart' },
      { status: 500 }
    );
  }
}

// GET: fetch cart items by cartId or by guest cookie
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cartId = searchParams.get("cartId");
    
    // If cartId provided, use it
    if (cartId) {
      const items = await getCartItemsWithProducts(cartId);
      return NextResponse.json({ items });
    }

    // Otherwise, use guest ID from cookie
    const guestId = req.cookies.get('guestId')?.value;
    
    if (!guestId) {
      return NextResponse.json({ items: [] });
    }

    const cart = await prisma.cart.findFirst({
      where: { userId: guestId },
    });

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    const items = await getCartItemsWithProducts(cart.id);

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ items: [] });
  }
}