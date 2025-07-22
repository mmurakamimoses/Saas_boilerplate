"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function RedirectErrorHandler() {
  const searchParams = useSearchParams();
  const lastShownError = useRef<string | null>(null);
  
  useEffect(() => {
    const error = searchParams.get('error');
    console.log("🔍 [AUTH ERROR HANDLER] Checking for error parameter:", error);
    
    // Prevent duplicate toasts for the same error
    if (error && lastShownError.current === error) {
      return;
    }
    
    // Reset if no error
    if (!error) {
      lastShownError.current = null;
      return;
    }
    
    if (error === 'auth_required') {
      console.log("🚨 [AUTH ERROR HANDLER] Showing auth required toast");
      lastShownError.current = error;
      // Add a small delay to ensure the component is fully mounted
      setTimeout(() => {
        toast.error("Please sign in to access the dashboard");
      }, 100);
    } else if (error === 'admin_required') {
      console.log("🚨 [AUTH ERROR HANDLER] Showing admin required toast");
      lastShownError.current = error;
      // Add a small delay to ensure the component is fully mounted
      setTimeout(() => {
        toast.error("Access denied: Admin privileges required to view that page.");
      }, 100);
    } else if (error === 'plan_required') {
      console.log("🚨 [AUTH ERROR HANDLER] Showing plan required toast");
      lastShownError.current = error;
      // Add a small delay to ensure the component is fully mounted
      setTimeout(() => {
        toast.error("Access denied: A paid plan (Pro or Lifetime) is required to access this feature.");
      }, 100);
    } else if (error === 'already_authenticated') {
      console.log("🚨 [AUTH ERROR HANDLER] Showing already authenticated toast");
      lastShownError.current = error;
      // Add a small delay to ensure the component is fully mounted
      setTimeout(() => {
        toast.info("You are already signed in and have been redirected to the dashboard.");
      }, 100);
    }
  }, [searchParams]);

  return null;
} 