import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/forms/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Suspense fallback={
        <div className="text-center">
          <h1 className="text-4xl font-bold">Reset Password</h1>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      }>
        <ResetPasswordForm className="[&_[data-slot=card]]:border-0 [&_[data-slot=card]]:bg-transparent [&_[data-slot=card]]:shadow-none" />
      </Suspense>
    </div>
  );
}
