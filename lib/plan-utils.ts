import { db } from "@/db/drizzle";
import { user, subscription, lifetimeAccess } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type PlanType = 'Free' | 'Pro' | 'Lifetime';

/**
 * Determines the user's plan type based on their subscription and lifetime access status
 * and updates the user record
 */
export async function syncUserPlanType(userId: string): Promise<PlanType> {
  // Check for lifetime access first (highest priority)
  const lifetimeRecord = await db
    .select()
    .from(lifetimeAccess)
    .where(
      and(
        eq(lifetimeAccess.userId, userId),
        eq(lifetimeAccess.status, 'active')
      )
    )
    .limit(1);

  if (lifetimeRecord.length > 0) {
    await updateUserPlanType(userId, 'Lifetime');
    return 'Lifetime';
  }

  // Check for active subscription
  const activeSubscription = await db
    .select()
    .from(subscription)
    .where(
      and(
        eq(subscription.referenceId, userId),
        eq(subscription.status, 'active')
      )
    )
    .limit(1);

  if (activeSubscription.length > 0) {
    await updateUserPlanType(userId, 'Pro');
    return 'Pro';
  }

  // Default to Free
  await updateUserPlanType(userId, 'Free');
  return 'Free';
}

/**
 * Updates the user's plan type in the database
 */
export async function updateUserPlanType(userId: string, planType: PlanType): Promise<void> {
  await db
    .update(user)
    .set({ 
      planType,
      updatedAt: new Date()
    })
    .where(eq(user.id, userId));

  console.log(`✅ [PLAN SYNC] User ${userId} plan type updated to: ${planType}`);
} 