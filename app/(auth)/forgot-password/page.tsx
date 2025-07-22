import { ForgotPasswordForm } from "@/components/auth/forms/forgot-password-form";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <ForgotPasswordForm className="[&_[data-slot=card]]:border-0 [&_[data-slot=card]]:bg-transparent [&_[data-slot=card]]:shadow-none" />
    </div>
  );
}
