

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PATCH: update a cart item
export async function PATCH(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // <-- Await params
  const body = await req.json();
  
  const updatedItem = await prisma.cartItem.update({
    where: { id },
    data: {
      quantity: body.quantity,
      size: body.size,
      color: body.color,
    },
  });
  
  return NextResponse.json(updatedItem);
}

// DELETE: remove a cart item
export async function DELETE(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // <-- Await params
  
  await prisma.cartItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
