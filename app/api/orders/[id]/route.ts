// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// // DELETE order
// export async function DELETE(
//     request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     try {
//         const { id } = params;

//         // Delete order items first, then order
//         await prisma.orderItem.deleteMany({
//             where: { orderId: id }
//         });

//         await prisma.order.delete({
//             where: { id }
//         });

//         return NextResponse.json({
//             success: true,
//             message: "Order deleted successfully"
//         }, { status: 200 });
//     } catch (error: any) {
//         console.error("Error deleting order:", error);
//         return NextResponse.json({
//             error: error.message || "Failed to delete order",
//             success: false
//         }, { status: 500 });
//     }
// }

// // PUT update order
// export async function PUT(
//     request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     try {
//         const { id } = params;
//         const body = await request.json();
//         const { userId, items, total } = body;

//         // Calculate prices for each item
//         const itemsWithPrices = await Promise.all(
//             items.map(async (item: any) => {
//                 const product = await prisma.product.findUnique({
//                     where: { id: item.productId }
//                 });
                
//                 return {
//                     productId: item.productId,
//                     quantity: item.quantity,
//                     size: item.size,
//                     color: item.color,
//                     price: product?.price || 0
//                 };
//             })
//         );

//         const productsString = items.map((item: any) => item.productId).join(',');

//         // Delete existing items
//         await prisma.orderItem.deleteMany({
//             where: { orderId: id }
//         });

//         // Update order with new items
//         const order = await prisma.order.update({
//             where: { id },
//             data: {
//                 userId,
//                 total,
//                 products: productsString,
//                 items: {
//                     create: itemsWithPrices
//                 }
//             },
//             include: {
//                 items: {
//                     include: {
//                         product: true
//                     }
//                 },
//                 user: true
//             }
//         });

//         return NextResponse.json({
//             data: order,
//             success: true
//         }, { status: 200 });
//     } catch (error: any) {
//         console.error("Error updating order:", error);
//         return NextResponse.json({
//             error: error.message || "Failed to update order",
//             success: false
//         }, { status: 500 });
//     }
// }





import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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