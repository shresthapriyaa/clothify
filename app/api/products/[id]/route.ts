
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// ---------------- GET - fetch single product ----------------
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }  // Changed: params is now a Promise in Next.js 15
) {
  try {
    
    // Await the params - CRITICAL for Next.js 15+
    const { id } = await context.params;

    if (!id) {
      console.error(' No ID provided');
      return NextResponse.json(
        { error: "Product ID is required" }, 
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      console.error(' Product not found:', id);
      
      // Get all products to help debug
      const allProducts = await prisma.product.findMany({
        select: { id: true, name: true },
        take: 5
      });
      
      return NextResponse.json(
        { error: "Product not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Product fetched successfully", 
        data: product 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ GET /api/products/[id] error:", error);
    console.error("Error message:", error.message);
    
    return NextResponse.json(
      { 
        error: error.message || "Internal Server Error",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }, 
      { status: 500 }
    );
  }
}

// ---------------- DELETE - remove product ----------------
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;  // Await params
    console.log('🗑️ DELETE request for product:', id);

    const existing = await prisma.product.findUnique({
      where: { id },
      include: {
        _count: { select: { orderItems: true } },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" }, 
        { status: 404 }
      );
    }

    if (existing._count.orderItems > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete product. This product has been included in ${existing._count.orderItems} order(s).`,
        },
        { status: 400 }
      );
    }

    await prisma.product.delete({ where: { id } });
    console.log('✅ Product deleted successfully');

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

// ---------------- PUT - update full product ----------------
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;  // Await params
    const body = await request.json();
    console.log('📝 PUT request for product:', id);

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" }, 
        { status: 404 }
      );
    }

    const { name, price, image, categoryId, categoryName, sizes, colors, isBest, isPopular, isSale } = body;

    if (!name || price === undefined) {
      return NextResponse.json(
        { error: "Name and price are required" }, 
        { status: 400 }
      );
    }

    let finalCategoryId = categoryId;

    if (!finalCategoryId && categoryName) {
      const category = await prisma.category.findFirst({
        where: { name: { equals: categoryName, mode: "insensitive" } },
      });
      if (!category) {
        return NextResponse.json(
          { error: `Category "${categoryName}" not found` }, 
          { status: 400 }
        );
      }
      finalCategoryId = category.id;
    }

    if (!finalCategoryId) {
      return NextResponse.json(
        { error: "Category ID or category name is required" }, 
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: parseFloat(price),
        image: image || "",
        categoryId: finalCategoryId,
        sizes: sizes || [],
        colors: colors || [],
        isBest: isBest ?? false,
        isPopular: isPopular ?? false,
        isSale: isSale ?? false,
      },
      include: { category: true },
    });

    console.log('✅ Product updated successfully');
    return NextResponse.json({ 
      message: "Product updated successfully", 
      data: product 
    });
  } catch (error: any) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

// ---------------- PATCH - update partial product ----------------
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;  // Await params
    const body = await request.json();
    console.log('🔧 PATCH request for product:', id);

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" }, 
        { status: 404 }
      );
    }

    const { name, price, image, categoryId, categoryName, sizes, colors, isBest, isPopular, isSale } = body;

    let finalCategoryId = categoryId;

    if (!finalCategoryId && categoryName) {
      const category = await prisma.category.findFirst({
        where: { name: { equals: categoryName, mode: "insensitive" } },
      });
      if (!category) {
        return NextResponse.json(
          { error: `Category "${categoryName}" not found` }, 
          { status: 400 }
        );
      }
      finalCategoryId = category.id;
    }

    if (finalCategoryId) {
      const category = await prisma.category.findUnique({ 
        where: { id: finalCategoryId } 
      });
      if (!category) {
        return NextResponse.json(
          { error: "Invalid category" }, 
          { status: 400 }
        );
      }
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (image !== undefined) updateData.image = image;
    if (finalCategoryId !== undefined) updateData.categoryId = finalCategoryId;
    if (sizes !== undefined) updateData.sizes = sizes;
    if (colors !== undefined) updateData.colors = colors;
    if (isBest !== undefined) updateData.isBest = isBest;
    if (isPopular !== undefined) updateData.isPopular = isPopular;
    if (isSale !== undefined) updateData.isSale = isSale;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { category: true },
    });

    console.log('✅ Product updated successfully');
    return NextResponse.json({ 
      message: "Product updated successfully", 
      data: product 
    });
  } catch (error: any) {
    console.error("PATCH /api/products/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}