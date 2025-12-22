
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


export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { success: false, 
        error: "Failed to fetch categories" },
      { 
        status: 500
       }
    )
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name } = body

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      )
    }

    const baseSlug = slugify(name)
    let finalSlug = baseSlug
    let counter = 1
    
    while (true) {
      const existing = await prisma.category.findUnique({
        where: { slug: finalSlug }
      })
      
      if (!existing) break
      
      finalSlug = `${baseSlug}-${counter}`
      counter++
    }

    const existingName = await prisma.category.findUnique({
      where: { name: name.trim() }
    })

    if (existingName) {
      return NextResponse.json(
        { success: false, error: "Category name already exists" },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        slug: finalSlug
      }
    })

    return NextResponse.json({
      success: true,
      data: category
    }, 
    {
       status: 201
       }
      )
  } catch (error) {

    console.error("Error creating category:", 
      error)
    return NextResponse.json(
      { success: false,
         error: "Failed to create category"
         },
      { status: 500

       }
    )
  }
}