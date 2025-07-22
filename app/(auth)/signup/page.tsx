import { SignupForm } from "@/components/auth/forms/signup-form";

export default function SignupPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <SignupForm className="[&_[data-slot=card]]:border-0 [&_[data-slot=card]]:bg-transparent [&_[data-slot=card]]:shadow-none" />
    </div>
  );
}
