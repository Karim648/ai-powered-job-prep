"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/features/users/components/UserAvatar";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  BookOpenIcon,
  BrainCircuitIcon,
  FileSlidersIcon,
  LogOut,
  SpeechIcon,
  User,
} from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Interviews", href: "interviews", Icon: SpeechIcon },
  { name: "Questions", href: "questions", Icon: BookOpenIcon },
  { name: "Resume", href: "resume", Icon: FileSlidersIcon },
];

export function Navbar({ user }: { user: { name: string; imageUrl: string } }) {
  const { openUserProfile } = useClerk();

  return (
    <nav className="h-header border-b">
      <div className="container flex h-full items-center justify-between">
        <Link href="/app" className="flex items-center gap-2">
          <BrainCircuitIcon className="text-primary size-8" />
          <span className="text-xl font-bold">Resumate AI</span>
        </Link>

        <div className="flex items-center gap-4">
          {navLinks.map((link) => (
            <Button key={link.name}>
              <Link href={link.href} className="flex items-center gap-2">
                <link.Icon />
                {link.name}
              </Link>
            </Button>
          ))}

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserAvatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => openUserProfile()}>
                <User className="mr-2" />
                Profile
              </DropdownMenuItem>
              <SignOutButton>
                <DropdownMenuItem>
                  <LogOut className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
