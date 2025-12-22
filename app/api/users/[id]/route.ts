// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import { hash } from "bcryptjs";
// import { Prisma, Role } from "@prisma/client";

// // GET single user by id
// export async function GET(
//   _request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     if (!id) {
//       return NextResponse.json(
//         { error: "Must provide id" },
//         { status: 400 }
//       )
//     }

//     const user = await prisma.user.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         role: true,
//         isVerified: true,
//         createdAt: true,
//       },
//     })

//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json(
//       { data: { ...user, name: user.username } },
//       { status: 200 }
//     )
//   } catch (error) {
//     console.error("Error fetching user:", error)
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     )
//   }
// }

// export async function DELETE(
//   _request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//     try {
//   const { id } = await params;

//         if(!id)
//         {
//             return NextResponse.json(
//                 { error: "Must provide id" },
//                 { status: 400 }
//             )
//         }

//     const user = await prisma.user.delete({
//             where:{
//                 id: id
//             },
//             select: {
//               id: true,
//               username: true,
//               email: true,
//               role: true,
//               isVerified: true,
//               createdAt: true,
//             }
//         })

//         return NextResponse.json(
//           {
//             message: "User deleted successfully",
//             data: { ...user, name: user.username },
//           },
//           { status: 200 }
//         );


//     } catch (error: unknown) {
//       console.error("Error deleting user:", error)
//       const prismaError = error as { code?: string }
//       if (prismaError?.code === "P2025") {
//         return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//         )
//       }
//       return NextResponse.json(
//         { error: "Internal Server Error" },
//         { status: 500 }
//       )
        
//     }
// }
// //put lay sabii change garxa existing field haru
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const data = await request.json();

//     if (!id) {
//       return NextResponse.json(
//         { error: "Must provide id" },
//         { status: 400 }
//       );
//     }

//     const updateData: Prisma.UserUpdateInput = {};
//     if (typeof data.name === "string") updateData.username = data.name;
//     if (typeof data.username === "string") updateData.username = data.username;
//     if (typeof data.email === "string") updateData.email = data.email;
//     if (typeof data.role === "string") {
//       const roleInput = data.role.toUpperCase();
//       const allowedRoles: Role[] = ["ADMIN",  "USER"]; 
//       if (!allowedRoles.includes(roleInput as Role)) {
//         return NextResponse.json(
//           { error: "Invalid role. Allowed: ADMIN,  USER" },
//           { status: 400 }
//         );
//       }
//       updateData.role = roleInput as Role;
//     }
//     if (typeof data.isVerified !== "undefined") updateData.isVerified = Boolean(data.isVerified);
//     if (typeof data.password === "string" && data.password.length > 0) {
//       updateData.password = await hash(data.password, 10);
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data: updateData,
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         role: true,
//         isVerified: true,
//         createdAt: true,
//       },
//     });

//     return NextResponse.json(
//       { message: "User updated successfully", data: { ...updatedUser, name: updatedUser.username } },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     console.error("Error updating user:", error);
//     const prismaError = error as { code?: string }
//     if (prismaError?.code === "P2002") {
//       return NextResponse.json(
//         { error: "Email already exists" },
//         { status: 409 }
//       )
//     }
//     if (prismaError?.code === "P2025") {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       )
//     }
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
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





