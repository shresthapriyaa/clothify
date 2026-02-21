
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
    console.log("POST /api/products called");
    
    const body = await request.json();
    console.log("Request body:", body);
    console.log("CategoryId received:", body.categoryId, "Type:", typeof body.categoryId);

    const { name, price, image, categoryId, sizes, colors, isBest, isPopular, isSale } = body;

    // Validation - categoryId MUST be a string
    if (!name || price === undefined || !categoryId || typeof categoryId !== 'string') {
      console.log(" ❌ Validation failed:", { 
        name: !!name, 
        price: price !== undefined, 
        categoryId, 
        categoryIdType: typeof categoryId 
      });
      return NextResponse.json(
        { error: "Name, price, and valid category (string) are required" },
        { status: 400 }
      );
    }

    // Verify category exists
    console.log("Checking if category exists with id:", categoryId);
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      console.log("❌ Invalid category:", categoryId);
      const allCategories = await prisma.category.findMany();
      console.log("Available categories:", allCategories.map(c => ({ id: c.id, name: c.name })));
      
      return NextResponse.json(
        { error: `Category not found. Please select a valid category.` },
        { status: 400 }
      );
    }

    console.log("✅ Found category:", category.name);
    console.log("Creating product with:", {
      name,
      price: parseFloat(price),
      categoryId,
      sizesCount: sizes?.length || 0,
      colorsCount: colors?.length || 0,
    });

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

    console.log("✅ Product created successfully:", product.id);

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





