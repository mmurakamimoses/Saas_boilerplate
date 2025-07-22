import { checkAccess, getUserAccessInfo } from "@/lib/access-control";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check paid plan access (Pro or Lifetime required, admin can override)
    const accessResult = await checkAccess({
      requireAuth: true,
      requireAdmin: false,
      requirePaidPlan: true,
      allowAdminOverride: true // Admins can access even without paid plan
    });

    if (!accessResult.hasAccess) {
      const statusCode = accessResult.errorType === 'auth_required' ? 401 : 403;
      let errorMessage;
      
      switch (accessResult.errorType) {
        case 'auth_required':
          errorMessage = "Authentication required";
          break;
        case 'plan_required':
          errorMessage = "Paid plan (Pro or Lifetime) required";
          break;
        default:
          errorMessage = "Access denied";
      }
      
      return NextResponse.json(
        { error: errorMessage }, 
        { status: statusCode }
      );
    }

    // Get user info for response
    const userInfo = await getUserAccessInfo();
    const isPaid = userInfo?.planType === 'Pro' || userInfo?.planType === 'Lifetime';

    // Return paid access info
    return NextResponse.json({ 
      message: "Paid plan access granted",
      user: {
        id: userInfo?.userId,
        role: userInfo?.role,
        planType: userInfo?.planType,
        isAdmin: userInfo?.isAdmin,
        isPaid: isPaid,
        accessReason: userInfo?.isAdmin ? "admin_override" : "paid_plan"
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Paid plan API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 