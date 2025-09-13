import { UserAvatar } from "@/features/users/components/UserAvatar";
import { cn } from "@/lib/utils";
import { BrainCircuitIcon } from "lucide-react";

export function CondensedMessages({
  messages,
  user,
  className,
  maxFft = 0,
}: {
  messages: { isUser: boolean; content: string[] }[];
  user: { name: string; imageUrl: string };
  className?: string;
  maxFft?: number;
}) {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {messages.map((message, index) => {
        const shouldAnimate = index === messages.length - 1 && maxFft > 0;

        return (
          <div
            key={index}
            className={cn(
              "flex max-w-3/4 items-center gap-5 rounded border py-4 pr-6 pl-4",
              message.isUser ? "self-end" : "self-start",
            )}
          >
            {message.isUser ? (
              <UserAvatar user={user} className="size-6 flex-shrink-0" />
            ) : (
              <div className="relative">
                <div
                  className={cn(
                    "border-muted absolute inset-0 rounded-full border-4",
                    shouldAnimate ? "animate-ping" : "hidden",
                  )}
                />
                <BrainCircuitIcon
                  className="relative size-6 flex-shrink-0"
                  style={shouldAnimate ? { scale: maxFft / 8 + 1 } : undefined}
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              {message.content.map((text, i) => (
                <span key={i}>{text}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
