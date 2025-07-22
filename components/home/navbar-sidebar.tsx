"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/templates/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/templates/ui/sheet";
import { ScrollArea } from "@/components/templates/ui/scroll-area";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NavbarSidebar = ({
  items,
  open,
  onOpenChange,
}: Props) => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>
            Menu
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            {session ? (
              // Show Dashboard and Logout when user is signed in
              <>
                <Link 
                  onClick={() => onOpenChange(false)} 
                  href="/dashboard" 
                  className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                >
                  Dashboard
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium justify-start rounded-none h-auto"
                >
                  Logout
                </Button>
              </>
            ) : (
              // Show Login and Sign Up when user is not signed in
              <>
                <Link 
                  onClick={() => onOpenChange(false)} 
                  href="/login" 
                  className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                >
                  Log in
                </Link>
                <Link 
                  onClick={() => onOpenChange(false)} 
                  href="/signup" 
                  className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSidebar;