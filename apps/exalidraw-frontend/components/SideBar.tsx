import { cn } from "@/lib/utils";
import { Download, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggleComponent";

interface SideBar {
  className: string;
  onClick: () => void;
}

export function Side({ className, onClick }: SideBar) {
  const route = useRouter();
  return (
    <div>
      <div
        className={cn(
          "absolute top-14 right-2 h-fit xs:w-30 sm:w-40 md:w-50 xl:w-60 rounded border-2 border-neutral-700/60 bg-neutral-700/30 p-4 pt-32 dark:border-cyan-400/40",
          className,
        )}
      >
        <div className="">
          <div className="absolute top-5 flex gap-10 ">
            <div className="flex items-center justify-around gap-4 text-2xl">
              <Download onClick={onClick} />
              {/* <ThemeToggle /> */}
            </div>
          </div>
          <div
            className="absolute bottom-10 mt-24 w-fit flex cursor-pointer items-center justify-center xs:gap-14 sm:gap-16 md:gap-20 xl:gap-36 rounded border-2 border-cyan-600/70 p-1"
            onClick={() => route.push("/rooms")}
          >
            <div className="text-lg">Exit</div>
            <div>
              <LogOut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
