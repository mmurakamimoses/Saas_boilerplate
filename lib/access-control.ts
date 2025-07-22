"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type UserRole = 'user' | 'admin';
export type PlanType = 'Free' | 'Pro' | 'Lifetime';

export interface AccessControlResult {
  hasAccess: boolean;
  errorType?: 'auth_required' | 'admin_required' | 'plan_required';
  redirectUrl?: string;
}

export interface UserAccessInfo {
  userId: string;
  role: UserRole;
  planType: PlanType;
  isAdmin: boolean;
}

/**
 * Get current user's access information (no DB lookup, use session only)
 */
export async function getUserAccessInfo(): Promise<UserAccessInfo | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return null;
    }

    const planType = (session.user.planType || 'Free') as PlanType;
    const role = (session.user.role || 'user') as UserRole;
    const isAdmin = role === 'admin';

    return {
      userId: session.user.id,
      role,
      planType,
      isAdmin
    };
  } catch (error) {
    console.error("❌ [ACCESS CONTROL] Failed to get user access info:", error);
    return null;
  }
}

/**
 * Check if user has admin role
 */
export async function requireAdmin(): Promise<AccessControlResult> {
  const userInfo = await getUserAccessInfo();

  if (!userInfo) {
    return {
      hasAccess: false,
      errorType: 'auth_required',
      redirectUrl: '/login?error=auth_required'
    };
  }

  if (!userInfo.isAdmin) {
    return {
      hasAccess: false,
      errorType: 'admin_required',
      redirectUrl: '/dashboard?error=admin_required'
    };
  }

  return { hasAccess: true };
}

/**
 * Check if user has a paid plan (Pro or Lifetime)
 */
export async function requirePaidPlan(): Promise<AccessControlResult> {
  const userInfo = await getUserAccessInfo();

  if (!userInfo) {
    return {
      hasAccess: false,
      errorType: 'auth_required',
      redirectUrl: '/login?error=auth_required'
    };
  }

  // Admins can override plan requirements
  if (userInfo.isAdmin) {
    return { hasAccess: true };
  }

  // Check if user has a paid plan
  const hasPaidPlan = userInfo.planType === 'Pro' || userInfo.planType === 'Lifetime';
  
  if (!hasPaidPlan) {
    return {
      hasAccess: false,
      errorType: 'plan_required',
      redirectUrl: '/dashboard?error=plan_required'
    };
  }

  return { hasAccess: true };
}

/**
 * Route-specific access control functions
 */

/**
 * Check access for /admin routes - Admin role required regardless of plan
 */
export async function checkAdminAccess(): Promise<AccessControlResult> {
  return await requireAdmin();
}

/**
 * Check access for /research routes - Paid plan required (unless admin)
 */
export async function checkResearchAccess(): Promise<AccessControlResult> {
  return await requirePaidPlan();
}

/**
 * Generic access control check with custom requirements
 */
export async function checkAccess(options: {
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requirePaidPlan?: boolean;
  allowAdminOverride?: boolean;
}): Promise<AccessControlResult> {
  const { 
    requireAuth = true, 
    requireAdmin = false, 
    requirePaidPlan = false,
    allowAdminOverride = true 
  } = options;

  // If no requirements, allow access
  if (!requireAuth && !requireAdmin && !requirePaidPlan) {
    return { hasAccess: true };
  }

  const userInfo = await getUserAccessInfo();

  // Check authentication requirement
  if (requireAuth && !userInfo) {
    return {
      hasAccess: false,
      errorType: 'auth_required',
      redirectUrl: '/login?error=auth_required'
    };
  }

  // If user is not authenticated but we need other checks, return auth required
  if (!userInfo) {
    return {
      hasAccess: false,
      errorType: 'auth_required',
      redirectUrl: '/login?error=auth_required'
    };
  }

  // Admin override - if enabled and user is admin, grant access
  if (allowAdminOverride && userInfo.isAdmin) {
    return { hasAccess: true };
  }

  // Check admin requirement
  if (requireAdmin && !userInfo.isAdmin) {
    return {
      hasAccess: false,
      errorType: 'admin_required',
      redirectUrl: '/dashboard?error=admin_required'
    };
  }

  // Check paid plan requirement
  if (requirePaidPlan) {
    const hasPaidPlan = userInfo.planType === 'Pro' || userInfo.planType === 'Lifetime';
    if (!hasPaidPlan) {
      return {
        hasAccess: false,
        errorType: 'plan_required',
        redirectUrl: '/dashboard?error=plan_required'
      };
    }
  }

  return { hasAccess: true };
}

 