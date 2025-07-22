import { checkAccess, getUserAccessInfo } from "@/lib/access-control";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check admin access using our access control system
    const accessResult = await checkAccess({
      requireAuth: true,
      requireAdmin: true,
      allowAdminOverride: false // Already checking for admin
    });

    if (!accessResult.hasAccess) {
      const statusCode = accessResult.errorType === 'auth_required' ? 401 : 403;
      const errorMessage = accessResult.errorType === 'auth_required' 
        ? "Authentication required" 
        : "Admin access required";
      
      return NextResponse.json(
        { error: errorMessage }, 
        { status: statusCode }
      );
    }

    // Get user info for response
    const userInfo = await getUserAccessInfo();

    // Return admin status info
    return NextResponse.json({ 
      message: "Admin access granted",
      admin: {
        id: userInfo?.userId,
        role: userInfo?.role,
        planType: userInfo?.planType,
        isAdmin: userInfo?.isAdmin
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 