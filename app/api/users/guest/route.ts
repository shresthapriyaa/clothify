
// =====================================================
// FILE 1: app/api/users/guest/route.ts (CREATE NEW)
// =====================================================
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { guestId } = await req.json();
    
    if (!guestId) {
      return NextResponse.json(
        { error: 'Guest ID required' },
        { status: 400 }
      );
    }
    
    // Check if guest user exists
    let user = await prisma.user.findUnique({
      where: { id: guestId }
    });
    
    if (!user) {
      // Create guest user
      user = await prisma.user.create({
        data: {
          id: guestId,
          username: `Guest-${Date.now()}`,
          email: `${guestId}@guest.com`,
          password: 'guest-no-password',
          role: 'USER',
          isVerified: false
        }
      });
      console.log('Created guest user:', user.id);
    }
    
    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error: any) {
    console.error('Error creating guest user:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}