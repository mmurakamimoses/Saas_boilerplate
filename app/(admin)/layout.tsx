import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-medium"
            >
              <div className="flex size-6 items-center justify-center rounded-md">
                <Image
                  width={24}
                  height={24}
                  src={"/glass.png"}
                  alt="PurePantry Logo"
                  priority
                />
              </div>
              PurePantry.Club
            </Link>
            
            <div className="text-sm text-muted-foreground">
              Admin Portal
            </div>
          </div>
        </div>
      </header>

      {/* Admin content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 