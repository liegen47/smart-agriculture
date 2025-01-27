import { cn } from "@/lib/utils";
import { Sprout } from "lucide-react";
import Link from "next/link";

export const Logo = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <Link href={"/"}>
      <div
        className={cn(
          "h-8 w-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground",
          className
        )}
        {...props}
      >
        <Sprout className="-mt-0.5 h-5 w-5" />
      </div>
    </Link>
  );
};
