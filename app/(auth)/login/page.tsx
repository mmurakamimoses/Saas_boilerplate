import { LoginForm } from "@/components/auth/forms/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full max-w-md mx-auto">
        <LoginForm className="[&_[data-slot=card]]:border-0 [&_[data-slot=card]]:bg-transparent [&_[data-slot=card]]:shadow-none" />
      </div>
    </Suspense>
  );
}
