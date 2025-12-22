




// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// // Utility: fetch cart items with product details
// async function getCartItemsWithProducts(cartId: string) {
//   const cartItems = await prisma.cartItem.findMany({ where: { cartId } });
//   const itemsWithProducts = await Promise.all(
//     cartItems.map(async (item) => {
//       const product = await prisma.product.findUnique({ where: { id: item.productId } });
//       return { ...item, product };
//     })
//   );
//   return itemsWithProducts;
// }

// // POST: create a cart for a user if not exists
// export async function POST(req: NextRequest) {
//   const { userId } = await req.json();
//   if (!userId) return NextResponse.json({ error: "User ID required" }, { status: 400 });

//   let cart = await prisma.cart.findFirst({ where: { userId } });
//   if (!cart) {
//     cart = await prisma.cart.create({ data: { userId } });
//   }

//   const items = await getCartItemsWithProducts(cart.id);

//   return NextResponse.json({ cartId: cart.id, items });
// }

// // GET: fetch cart items by cartId
// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const cartId = searchParams.get("cartId");
//   if (!cartId) return NextResponse.json({ error: "Cart ID required" }, { status: 400 });

//   const items = await getCartItemsWithProducts(cartId);
//   return NextResponse.json(items);
// }




import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Utility: fetch cart items with product details
async function getCartItemsWithProducts(cartId: string) {
  const cartItems = await prisma.cartItem.findMany({ where: { cartId } });
  const itemsWithProducts = await Promise.all(
    cartItems.map(async (item) => {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      return { ...item, product };
    })
  );
  return itemsWithProducts;
}

// POST: create a cart for a user if not exists
export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ error: "User ID required" }, { status: 400 });

  let cart = await prisma.cart.findFirst({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  const items = await getCartItemsWithProducts(cart.id);

  return NextResponse.json({ cartId: cart.id, items });
}

// GET: fetch cart items by cartId
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cartId = searchParams.get("cartId");
  if (!cartId) return NextResponse.json({ error: "Cart ID required" }, { status: 400 });

  const items = await getCartItemsWithProducts(cartId);
  return NextResponse.json(items);
}
