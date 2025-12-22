import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST: add item to cart
export async function POST(req: NextRequest) {
  const { cartId, productId, quantity, size, color } = await req.json();
  
  if (!cartId || !productId || !quantity) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Check if product exists
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // Check if item already exists in cart with same size/color
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId,
      productId,
      size: size || null,
      color: color || null
    }
  });

  if (existingItem) {
    // Update quantity
    const updatedItem = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    });
    return NextResponse.json(updatedItem);
  }

  // Create new cart item
  const cartItem = await prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity,
      size: size || null,
      color: color || null
    }
  });

  return NextResponse.json(cartItem);
}
