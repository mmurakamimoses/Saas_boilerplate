import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      {/* Better Auth Starter branding - top left */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-medium"
        >
          <div className=" text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Image
              width={50}
              height={50}
              src={"/glass.png"}
              alt="PurePantry Logo"
              priority
            />
          </div>
          PurePantry.Club
        </Link>
      </div>

      {/* Left side - Auth content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full">
          {children}
        </div>
      </div>
      
      {/* Right side - Background image */}
      <div className="flex-1 relative hidden md:block">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/auth-bg.png')" }}
        />
      </div>
    </div>
  );
} 