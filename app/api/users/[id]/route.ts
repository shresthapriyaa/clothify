

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";

// DELETE - Remove a user
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    console.log("DELETE /api/users/[id] called with:", id)

    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: { 
            orders: true
          }
        }
      }
    })

    if (!existing) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Check if user has orders
    if (existing._count.orders > 0) {
      return NextResponse.json(
        { 
          error: `Cannot delete user. This user has ${existing._count.orders} order(s).` 
        },
        { status: 400 }
      )
    }

    // Safe to delete
    await prisma.user.delete({
      where: { id }
    })

    console.log("User deleted successfully:", id)

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("DELETE /api/users/[id] error:", error)
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

// PUT - Full update (all fields required)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()

    console.log("PUT /api/users/[id] called with:", { id, body })

    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { id }
    })

    if (!existing) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const { name, email, password, role, isVerified } = body

    // Validation
    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "Name, email, and role are required" },
        { status: 400 }
      )
    }

    // Check if email is already taken by another user
    if (email !== existing.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email }
      })

      if (emailExists) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        )
      }
    }

    // Prepare update data
    const updateData: any = {
      username: name, // Map name -> username
      email,
      role,
      isVerified: isVerified ?? existing.isVerified
    }

    // Only hash and update password if provided
    if (password && password.trim() !== '') {
      const hashedPassword = await hash(password, 10)
      updateData.password = hashedPassword
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true
      }
    })

    // Map username -> name for frontend
    const mapped = {
      ...user,
      name: user.username
    }

    console.log("User updated successfully (PUT):", mapped)

    return NextResponse.json(
      { message: "User updated successfully", data: mapped },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("PUT /api/users/[id] error:", error)

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
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

    console.log("PATCH /api/users/[id] called with:", { id, body })

    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { id }
    })

    if (!existing) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const { name, email, password, role, isVerified } = body

    // Check if email is already taken by another user
    if (email && email !== existing.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email }
      })

      if (emailExists) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        )
      }
    }

    // Build update data dynamically
    const updateData: any = {}

    if (name !== undefined) updateData.username = name // Map name -> username
    if (email !== undefined) updateData.email = email
    if (role !== undefined) updateData.role = role
    if (isVerified !== undefined) updateData.isVerified = isVerified

    // Only hash and update password if provided
    if (password && password.trim() !== '') {
      const hashedPassword = await hash(password, 10)
      updateData.password = hashedPassword
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true
      }
    })

    // Map username -> name for frontend
    const mapped = {
      ...user,
      name: user.username
    }

    console.log("User updated successfully (PATCH):", mapped)

    return NextResponse.json(
      { message: "User updated successfully", data: mapped },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("PATCH /api/users/[id] error:", error)

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}





