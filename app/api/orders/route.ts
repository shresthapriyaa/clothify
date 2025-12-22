
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all orders
export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            data: orders,
            success: true
        }, 
        { status: 200 

        }
    );
    } catch (error: any) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            
            {
            error: error.message || "Failed to fetch orders",

            success: false
        }, 
        { 
            status: 500
         }
        );
    }
}

// POST create new order
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, items, total } = body;

        console.log("Received order data:", { userId, items, total });

        // Validation
        if (!userId || !items || items.length === 0) {
            return NextResponse.json({
                error: "User and items are required",
                success: false
            },
             { 
                status: 400
             }
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

        // Create products string (comma-separated product IDs)
        const productsString = items.map((item: any) => item.productId).join(',');

        // Create order with items
        const order = await prisma.order.create({
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

        return NextResponse.json({
            data: order,
            success: true
        }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating order:", error);
        return NextResponse.json({
            error: error.message || "Failed to create order",
            success: false
        }, { status: 500 });
    }
}
