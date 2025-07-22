"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/templates/ui/button";
import { authClient } from "@/lib/auth-client";

import NavbarSidebar from "./navbar-sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
};

const NavbarItem = ({
  href,
  children,
  isActive,
}: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 py-6 text-base xl:text-lg shadow-none",
        isActive && "bg-[#F7C55F] text-black hover:bg-[#F7C55F]/90 hover:text-black",
      )}
    >
      <Link href={href}>
        {children}
      </Link>
    </Button>
  );
};

const navbarItems = [
 
  { href: "/research", children: "Research Reports" },
  { href: "/popular-stacks", children: "Popular Stacks" },
  { href: "/marketplace", children: "Marketplace" },
  { href: "/", children: "About" },
];
  
export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { data: session } = authClient.useSession();

  // Ensure we only calculate active state after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  // Hide navbar on /custom-admin and its children
  if (pathname.startsWith("/custom-admin")) {
    return null;
  }

  return (
    <>
      {/* Main Navbar */}
      <nav className="h-20 flex items-center border-b-2 font-medium bg-white sticky top-0 z-50">
        {/* PurePantry Logo - Positioned within navbar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-7xl z-50 pointer-events-none">
          <div className="flex items-center h-20 pl-2 xl:pl-0">
            <Link href="/" className={"flex items-center pointer-events-auto"}>
              <span className={cn("text-4xl font-semibold", poppins.className)}>
                PurePantry
              </span>
            </Link>
          </div>
        </div>
        <NavbarSidebar
          items={navbarItems}
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
        />

        {/* Desktop navbar items and auth buttons */}
        <div className="ml-auto flex items-center">
          <div className="items-center gap-4 hidden lg:flex pr-8">
            {navbarItems.map((item) => (
              <NavbarItem
                key={item.href}
                href={item.href}
                isActive={isHydrated ? pathname === item.href : false}
              >
                {item.children}
              </NavbarItem>
            ))}
          </div>
          <div className="hidden lg:flex h-20">
            {session ? (
              // Show Dashboard and Logout when user is signed in
              <>
                <Button
                  asChild
                  variant="secondary"
                  className="border-l border-t-0 border-b-1 border-r-0 px-6 xl:px-12 h-full rounded-none bg-white hover:bg-purple-200 transition-colors text-base xl:text-lg"
                >
                  <Link prefetch href="/dashboard">
                    Dashboard
                  </Link>
                </Button>
                <Button
                  onClick={handleLogout}
                  className="border-l border-t-0 border-b-1 border-r-0 px-6 xl:px-12 h-full rounded-none bg-purple-200 text-black hover:bg-purple-400 hover:text-black transition-colors text-base xl:text-lg"
                >
                  Logout
                </Button>
              </>
            ) : (
              // Show Login and Sign Up when user is not signed in
              <>
                <Button
                  asChild
                  variant="secondary"
                  className="border-l border-t-0 border-b-1 border-r-0 px-6 xl:px-12 h-full rounded-none bg-white hover:bg-purple-200 transition-colors text-base xl:text-lg"
                >
                  <Link prefetch href="/login">
                    Log in
                  </Link>
                </Button>
                <Button
                  asChild
                  className="border-l border-t-0 border-b-1 border-r-0 px-6 xl:px-12 h-full rounded-none bg-purple-200 text-black hover:bg-purple-400 hover:text-black transition-colors text-base xl:text-lg"
                >
                  <Link prefetch href="/signup">
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center justify-center">
          <Button
            variant="ghost"
            className="size-12 border-transparent bg-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon />
          </Button>
        </div>
      </nav>
    </>
  );
};