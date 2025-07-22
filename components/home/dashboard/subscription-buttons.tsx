"use client";

import { useState } from "react";
import { Button } from "@/components/templates/ui/button";
import { authClient } from "@/lib/auth-client";

export function ProButton() {
  const { data: session } = authClient.useSession();
  const [upgrading, setUpgrading] = useState(false);

  const handleUpgrade = async () => {
    if (!session?.user) return;
    
    setUpgrading(true);
    try {
      const { error } = await authClient.subscription.upgrade({
        plan: "pro",
        successUrl: `${window.location.origin}/dashboard?success=true`,
        cancelUrl: `${window.location.origin}/dashboard?canceled=true`,
      });

      if (error) {
        console.error("Upgrade failed:", error);
        alert(`Upgrade failed: ${error.message}`);
      }
      // If no error, user will be redirected to Stripe checkout
    } catch (error) {
      console.error("Upgrade error:", error);
      alert("An error occurred during upgrade. Please try again.");
    } finally {
      setUpgrading(false);
    }
  };

  if (!session?.user) {
    return (
      <Button disabled variant="outline">
        Loading...
      </Button>
    );
  }

  const planType = (session.user as any).planType || 'Free';

  // If user has lifetime access, show disabled button
  if (planType === 'Lifetime') {
    return (
      <Button disabled variant="outline" className="text-muted-foreground">
        Pro Plan (You have Lifetime Access)
      </Button>
    );
  }

  // If user already has Pro plan, show disabled button
  if (planType === 'Pro') {
    return (
      <Button disabled variant="default" className="bg-blue-600 hover:bg-blue-600">
        You have Pro Plan
      </Button>
    );
  }

  // If user is on Free plan, show upgrade button
  return (
    <Button 
      onClick={handleUpgrade} 
      disabled={upgrading}
      variant="default"
      className="bg-blue-600 hover:bg-blue-700"
    >
      {upgrading ? "Processing..." : "Upgrade to Pro"}
    </Button>
  );
}

export function LifetimeAccessButton() {
  const { data: session } = authClient.useSession();
  const [purchasing, setPurchasing] = useState(false);

  const handleLifetimePurchase = async () => {
    if (!session?.user) return;
    
    setPurchasing(true);
    try {
      const response = await fetch('/api/lifetime-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          successUrl: `${window.location.origin}/dashboard?lifetime=success`,
          cancelUrl: `${window.location.origin}/dashboard?lifetime=canceled`,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Lifetime purchase failed:", data.error);
        alert(`Purchase failed: ${data.error}`);
      } else if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Lifetime purchase error:", error);
      alert("An error occurred during purchase. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  if (!session?.user) {
    return (
      <Button disabled variant="outline">
        Loading...
      </Button>
    );
  }

  const planType = (session.user as any).planType || 'Free';

  // If user already has lifetime access, show success message
  if (planType === 'Lifetime') {
    return (
      <Button disabled variant="default" className="bg-purple-600 hover:bg-purple-600">
        You have Lifetime Access
      </Button>
    );
  }

  // For Free or Pro users, show purchase button
  return (
    <Button 
      onClick={handleLifetimePurchase} 
      disabled={purchasing}
      variant="default"
      className="bg-purple-600 hover:bg-purple-700"
    >
      {purchasing ? "Processing..." : "Get Lifetime Access"}
    </Button>
  );
}

export function SubscriptionButtons() {
  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      <ProButton />
      <LifetimeAccessButton />
    </div>
  );
} 