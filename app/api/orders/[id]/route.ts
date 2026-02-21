
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id)
      return NextResponse.json({ error: "Must provide id" }, { status: 400 });

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


// DELETE – remove an order and its items
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id)
      return NextResponse.json({ error: "Must provide id" }, { status: 400 });

    // Delete order items first (due to foreign key constraints)
    await prisma.orderItem.deleteMany({
      where: { orderId: id }
    });

    // Then delete the order
    const deletedOrder = await prisma.order.delete({ 
      where: { id } 
    });

    return NextResponse.json(
      { message: "Order deleted successfully", data: deletedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT – full update (all fields required)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id)
      return NextResponse.json({ error: "Must provide id" }, { status: 400 });

    const body = await req.json();
    const { userId, items, total } = body;

    // Validate required fields
    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { error: "User and items are required" },
        { status: 400 }
      );
    }

    // Calculate prices for each item
    const itemsWithPrices = await Promise.all(
      items.map(async (item: any) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        });
        
        return {
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: product?.price || 0
        };
      })
    );

    const productsString = items.map((item: any) => item.productId).join(',');

    // Delete existing items
    await prisma.orderItem.deleteMany({
      where: { orderId: id }
    });

    // Update order with new items
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        userId,
        total,
        products: productsString,
        items: {
          create: itemsWithPrices
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: true
      }
    });

    return NextResponse.json(
      { message: "Order updated successfully", data: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order (PUT):", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH – partial update (only changed fields)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id)
      return NextResponse.json({ error: "Must provide id" }, { status: 400 });

    const body = await req.json();

    // If items are being updated, handle them separately
    if (body.items) {
      const itemsWithPrices = await Promise.all(
        body.items.map(async (item: any) => {
          const product = await prisma.product.findUnique({
            where: { id: item.productId }
          });
          
          return {
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            price: product?.price || 0
          };
        })
      );

      const productsString = body.items.map((item: any) => item.productId).join(',');

      // Delete existing items
      await prisma.orderItem.deleteMany({
        where: { orderId: id }
      });

      // Update order with new items
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: {
          ...(body.userId && { userId: body.userId }),
          ...(body.total !== undefined && { total: body.total }),
          products: productsString,
          items: {
            create: itemsWithPrices
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          },
          user: true
        }
      });

      return NextResponse.json(
        { message: "Order updated (PATCH)", data: updatedOrder },
        { status: 200 }
      );
    }

    // If no items update, just update order fields
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        ...(body.userId && { userId: body.userId }),
        ...(body.total !== undefined && { total: body.total }),
        ...(body.products && { products: body.products }),
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: true
      }
    });

    return NextResponse.json(
      { message: "Order updated (PATCH)", data: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order (PATCH):", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}