import { checkAccess, getUserAccessInfo } from "@/lib/access-control";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check authentication only (no role or plan requirements)
    const accessResult = await checkAccess({
      requireAuth: true,
      requireAdmin: false,
      requirePaidPlan: false
    });

    if (!accessResult.hasAccess) {
      return NextResponse.json(
        { error: "Authentication required" }, 
        { status: 401 }
      );
    }

    // Get user info for response
    const userInfo = await getUserAccessInfo();

    // Return user profile info for any authenticated user
    return NextResponse.json({ 
      message: "Authenticated user profile",
      user: {
        id: userInfo?.userId,
        role: userInfo?.role,
        planType: userInfo?.planType,
        isAdmin: userInfo?.isAdmin,
        isPaid: userInfo?.planType === 'Pro' || userInfo?.planType === 'Lifetime'
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Authenticated API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 