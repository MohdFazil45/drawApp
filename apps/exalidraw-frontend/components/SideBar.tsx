import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

interface SideBar {
  className: string;
  onClick: () => void;
}

export function Side({ className, onClick }: SideBar) {
  return (
    <div >
      <div
        onClick={onClick}
        className={cn(
          "absolute top-0 right-0 w-60 h-full p-4 pt-24 border-l-2 bg-neutral-700/30 rounded dark:border-cyan-400/40 border-neutral-700/60",
          className,
        )}
      >
        <div className="flex absolute top-5 gap-10">
          <div className="text-2xl cursor-pointer">
            <Download />
          </div>
        </div>
      </div>
    </div>
  );
}
