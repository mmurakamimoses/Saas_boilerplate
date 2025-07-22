"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/templates/ui/button";
import { authClient } from "@/lib/auth-client";

export function SubscriptionManager() {
  const { data: session } = authClient.useSession();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (session?.user && (session.user as any).planType === 'Pro') {
      loadSubscriptions();
    } else {
      setLoading(false);
    }
  }, [session]);

  const loadSubscriptions = async () => {
    try {
      const { data } = await authClient.subscription.list();
      setSubscriptions(data || []);
    } catch (error) {
      console.error("Failed to load subscriptions:", error);
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!session?.user) return;
    
    setActionLoading(true);
    try {
      const { error } = await authClient.subscription.cancel({
        subscriptionId,
        returnUrl: `${window.location.origin}/dashboard`,
      });

      if (error) {
        console.error("Cancel failed:", error);
        alert(`Cancel failed: ${error.message}`);
      } else {
        // Redirect to Stripe Billing Portal will happen automatically
        // or refresh the subscriptions list
        await loadSubscriptions();
      }
    } catch (error) {
      console.error("Cancel error:", error);
      alert("An error occurred while canceling. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestoreSubscription = async (subscriptionId: string) => {
    if (!session?.user) return;
    
    setActionLoading(true);
    try {
      const { error } = await authClient.subscription.restore({
        subscriptionId,
      });

      if (error) {
        console.error("Restore failed:", error);
        alert(`Restore failed: ${error.message}`);
      } else {
        alert("Subscription restored successfully!");
        await loadSubscriptions();
      }
    } catch (error) {
      console.error("Restore error:", error);
      alert("An error occurred while restoring. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  if (!session?.user) {
    return null;
  }

  const planType = (session.user as any).planType || 'Free';

  // Only show subscription manager for Pro users
  // Free users don't have subscriptions, Lifetime users don't have subscriptions to manage
  if (planType !== 'Pro') {
    return null;
  }

  if (loading) {
    return (
      <Button disabled variant="outline">
        Loading subscription...
      </Button>
    );
  }

  // Check if user has an active subscription
  const activeSubscription = subscriptions.find(
    (sub) => sub.status === "active"
  );

  // If no active subscription found but planType is Pro, show message
  if (!activeSubscription) {
    return (
      <div className="text-sm text-muted-foreground text-center">
        Pro Plan - Subscription details loading...
      </div>
    );
  }

  // Check if subscription is marked for cancellation
  const isCancelAtPeriodEnd = activeSubscription.cancelAtPeriodEnd;
  const periodEnd = activeSubscription.periodEnd;

  // Helper to format the period end date
  function formatPeriodEnd(date: string | number | Date | undefined) {
    if (!date) return null;
    const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow max-w-md w-full mb-2">
      <p className="text-sm text-muted-foreground text-left">
        Pro Plan - {isCancelAtPeriodEnd ? (
          <>
            Cancels at period end
            {periodEnd && (
              <span> ({formatPeriodEnd(periodEnd)})</span>
            )}
          </>
        ) : "Active"}
      </p>
      <div className="flex gap-2 items-start justify-start mt-2">
        {!isCancelAtPeriodEnd ? (
          <Button 
            onClick={() => handleCancelSubscription(activeSubscription.id)} 
            disabled={actionLoading}
            variant="destructive"
            size="sm"
          >
            {actionLoading ? "Processing..." : "Cancel Subscription"}
          </Button>
        ) : (
          <Button 
            onClick={() => handleRestoreSubscription(activeSubscription.id)} 
            disabled={actionLoading}
            variant="default"
            size="sm"
          >
            {actionLoading ? "Processing..." : "Restore Subscription"}
          </Button>
        )}
      </div>
    </div>
  );
} 