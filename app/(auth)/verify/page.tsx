"use client";

import { Button } from "@/components/templates/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/templates/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { resendVerificationEmail } from "@/server/users";

function VerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const fromForgotPassword = searchParams.get('from') === 'forgot-password';
  const [isResending, setIsResending] = useState(false);
  const [lastResendTime, setLastResendTime] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);

  // Rate limiting effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("No email address found");
      return;
    }

    // Check rate limiting (30 seconds = 30000 ms)
    const now = Date.now();
    const rateLimitMs = 30000; // 30 seconds
    
    if (lastResendTime && (now - lastResendTime) < rateLimitMs) {
      const remainingSeconds = Math.ceil((rateLimitMs - (now - lastResendTime)) / 1000);
      toast.error(`Please wait ${remainingSeconds} seconds before requesting another email`);
      return;
    }

    setIsResending(true);
    setLastResendTime(now);
    setCountdown(30); // Start 30-second countdown
    
    const { success, message } = await resendVerificationEmail(email);

    if (success) {
      toast.success(message as string);
    } else {
      toast.error(message as string);
      // Reset rate limit on error so user can try again
      setLastResendTime(0);
      setCountdown(0);
    }

    setIsResending(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-0 bg-transparent shadow-none">
        {email ? (
          <>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-4xl font-bold">Check Your Email</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                {fromForgotPassword 
                  ? "You must verify your email before resetting your password. We've sent a verification link to your email address."
                  : "We've sent a verification link to your email address. Click the link in the email to verify your account and complete the signup process."
                }
              </p>
              
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium text-amber-600">
                  ⚠️ The verification link will expire in 15 minutes.
                </p>
                <p className="text-xs text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or resend the verification email.
                </p>
                <div className="flex gap-2 justify-center mt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleResendEmail}
                    disabled={isResending}
                  >
                    {isResending ? (
                      <Loader2 className="size-4 animate-spin mr-2" />
                    ) : null}
                    {countdown > 0 && !isResending ? `Resend Email (${countdown}s)` : "Resend Email"}
                  </Button>
                  <Button asChild>
                    <Link href="/login">Back to Login</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-12 w-12 text-gray-400" />
              </div>
              <CardTitle className="text-4xl font-bold">Invalid Verification Page</CardTitle>
              <CardDescription>
                This verification page requires a valid email address.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                You&apos;ve accessed this page without a valid email parameter. Please return to the home page and start the signup process again.
              </p>
              
              <div className="flex justify-center mt-4">
                <Button asChild className="w-full">
                  <Link href="/">Return to Home Page</Link>
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold">Email Verification</h1>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
} 