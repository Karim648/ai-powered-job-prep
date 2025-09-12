import { ThemeToggle } from "@/components/ThemeToggle";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-4">
        <SignInButton />
        <UserButton />
        <ThemeToggle />
      </div>
    </div>
  );
}
