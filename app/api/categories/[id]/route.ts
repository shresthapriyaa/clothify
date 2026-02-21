
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }  
) {
  try {
    const { id } = await context.params  
    const body = await request.json()
    const { name } = body

    console.log("PATCH /api/categories/[id] called with:", { id, name })

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      )
    }

    // Check if category exists
    const existing = await prisma.category.findUnique({
      where: { id }
    })

    if (!existing) {
      console.log("Category not found:", id)
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      )
    }

    // Check if name is taken by another category
    const nameExists = await prisma.category.findFirst({
      where: {
        name: name.trim(),
        NOT: { id }
      }
    })

    if (nameExists) {
      return NextResponse.json(
        { success: false, error: "Category name already exists" },
        { status: 400 }
      )
    }

    // Generate new slug
    const baseSlug = slugify(name)
    let finalSlug = baseSlug
    let counter = 1
    
    while (true) {
      const slugExists = await prisma.category.findFirst({
        where: {
          slug: finalSlug,
          NOT: { id }
        }
      })
      
      if (!slugExists) break
      
      finalSlug = `${baseSlug}-${counter}`
      counter++
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: name.trim(),
        slug: finalSlug
      }
    })

    console.log("Category updated successfully:", category)

    return NextResponse.json({
      success: true,
      data: category
    })
  } catch (error: any) {
    console.error("PATCH /api/categories/[id] error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update category" },
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

    console.log("DELETE /api/categories/[id] called with:", id)

    // Check if category exists
    const existing = await prisma.category.findUnique({
      where: { id }
    })

    if (!existing) {
      console.log("Category not found:", id)
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      )
    }

    // Check if category has products
    const productsCount = await prisma.product.count({
      where: { categoryId: id }
    })

    if (productsCount > 0) {
      console.log(`Cannot delete category with ${productsCount} products`)
      return NextResponse.json(
        { success: false, error: `Cannot delete category. It has ${productsCount} product(s).` },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id }
    })

    console.log("Category deleted successfully:", id)

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully"
    })
  } catch (error: any) {
    console.error("DELETE /api/categories/[id] error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete category" },
      { status: 500 }
    )
  }
}