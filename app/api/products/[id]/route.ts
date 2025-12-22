

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch single product matraii by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    console.log("GET /api/products/[id] called with:", id)

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Product fetched successfully", data: product },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("GET /api/products/[id] error:", error)
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}


export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    console.log("DELETE /api/products/[id] called with:", id)

    
    
    const existing = await prisma.product.findUnique({
      where: { id },
      include: {
        _count: {
          select: { orderItems: true }
        }
      }
    })

    if (!existing) {
      console.log("Product not found:", id)
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    
    if (existing._count.orderItems > 0) {
      console.log(`Product has ${existing._count.orderItems} order(s), cannot delete`)
      return NextResponse.json(
        { 
          error: `Cannot delete product. This product has been included in ${existing._count.orderItems} order(s).` 
        },
        { status: 400 }
      )
    }

   
    
    await prisma.product.delete({
      where: { id }
    })

    console.log("Product deleted successfully:", id)

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("DELETE /api/products/[id] error:", error)
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}



export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()

    console.log("PUT /api/products/[id] called with:", { id, body })

    
    
    const existing = await prisma.product.findUnique({
      where: { id }
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    const { name, price, image, categoryId, categoryName, sizes, colors, isBest, isPopular, isSale } = body

    
    
    if (!name || price === undefined) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      )
    }

    
    
    let finalCategoryId = categoryId

    if (!finalCategoryId && categoryName) {
      
      
      const category = await prisma.category.findFirst({
        where: { 
          name: {
            equals: categoryName,
            mode: 'insensitive'
          }
        }
      })

      if (!category) {
        return NextResponse.json(
          { error: `Category "${categoryName}" not found` },
          { status: 400 }
        )
      }

      finalCategoryId = category.id
    }

    if (!finalCategoryId) {
      return NextResponse.json(
        { error: "Category ID or category name is required" },
        { status: 400 }
      )
    }

    
    
    const category = await prisma.category.findUnique({
      where: { id: finalCategoryId }
    })

    if (!category) {
      return NextResponse.json(
        { 
          error: "Invalid category" 
        },
        { 
          status: 400
         }
      )
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
        isSale: isSale ?? false
      },
      include: {
        category: true
      }
    })

    console.log("Product updated successfully (PUT):", product)

    return NextResponse.json(
      { 
        message: "Product updated successfully",
         data: product
         },
      { 
        status: 200 
      }
    )
  } catch (error: any) {
    console.error("PUT /api/products/[id] error:", error)
    return NextResponse.json(
      { 
        error: error.message ||
         "Internal Server Error" 
        },
      {
         status: 500
         }
    )
  }
}

// PATCH - Partial update (only changed fields)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()

    console.log("PATCH /api/products/[id] called with:", { id, body })

    // Check if product exists
    const existing = await prisma.product.findUnique({
      where: { id }
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    const { name, price, image, categoryId, categoryName, sizes, colors, isBest, isPopular, isSale } = body

    // Handle both categoryId and categoryName
    let finalCategoryId = categoryId

    if (!finalCategoryId && categoryName) {
      // Find category by name
      const category = await prisma.category.findFirst({
        where: { 
          name: {
            equals: categoryName,
            mode: 'insensitive'
          }
        }
      })

      if (!category) {
        return NextResponse.json(
          { error: `Category "${categoryName}" not found` },
          { status: 400 }
        )
      }

      finalCategoryId = category.id
    }

    // Verify category exists if provided
    if (finalCategoryId) {
      const category = await prisma.category.findUnique({
        where: { id: finalCategoryId }
      })

      if (!category) {
        return NextResponse.json(
          { error: "Invalid category" },
          { status: 400 }
        )
      }
    }

    // Build update data object dynamically
    const updateData: any = {}
    
    if (name !== undefined) updateData.name = name
    if (price !== undefined) updateData.price = parseFloat(price)
    if (image !== undefined) updateData.image = image
    if (finalCategoryId !== undefined) updateData.categoryId = finalCategoryId
    if (sizes !== undefined) updateData.sizes = sizes
    if (colors !== undefined) updateData.colors = colors
    if (isBest !== undefined) updateData.isBest = isBest
    if (isPopular !== undefined) updateData.isPopular = isPopular
    if (isSale !== undefined) updateData.isSale = isSale

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true
      }
    })

    console.log("Product updated successfully (PATCH):", product)

    return NextResponse.json(
      { message: "Product updated successfully", data: product },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("PATCH /api/products/[id] error:", error)
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}