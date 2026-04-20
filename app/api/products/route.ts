
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(
      { message: "Products fetched successfully", data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    
    const body = await request.json();
    const { name, price, image, categoryId, sizes, colors, isBest, isPopular, isSale } = body;

    // Validation - categoryId MUST be a string
    if (!name || price === undefined || !categoryId || typeof categoryId !== 'string') {
      return NextResponse.json(
        { error: "Name, price, and valid category (string) are required" },
        { status: 400 }
      );
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return NextResponse.json(
        { error: `Category not found. Please select a valid category.` },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        image: image || "",
        categoryId, // String
        sizes: sizes || [],
        colors: colors || [],
        isBest: isBest ?? false,
        isPopular: isPopular ?? false,
        isSale: isSale ?? false
      },
      include: {
        category: true
      }
    });

    return NextResponse.json(
      { message: "Product created successfully", data: product },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ POST /api/products error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}





