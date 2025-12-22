



import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    });

    // Map `username` (DB) to `name` (frontend)
    const mapped = users.map((u) => ({
      id: u.id,
      name: u.username,
      email: u.email,
      role: u.role,
      isVerified: u.isVerified,
      createdAt: u.createdAt,
    }));

    return NextResponse.json(
      { message: "Users fetched successfully", data: mapped },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, role, password, isVerified } = await request.json();

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username: name, // use name as username
        email,
        password: hashedPassword,
        role,
        isVerified: isVerified ?? false, // default to false if undefined
      },
    });

    // Map username -> name for frontend
    const mapped = { ...user, name: user.username };

    return NextResponse.json(
      { message: "User created successfully", data: mapped },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

