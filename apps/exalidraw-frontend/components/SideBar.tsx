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
          "absolute top-0 right-0 w-60  h-full p-4 pt-24 border-l-2 bg-neutral-700/30 rounded dark:border-cyan-400/40 border-neutral-700/60",
          className,
        )}
      >
        <div className="flex absolute top-5 gap-10">
          <div className="flex gap-4 text-2xl" >
            <Download onClick={onClick}/>
            <ThemeToggle/>

          </div>
        </div>
        <div
          className="absolute bottom-10 flex items-center justify-center gap-36 border p-1 rounded cursor-pointer"
          onClick={()=>route.push("/")}
        >
          <div className="text-xl">Exit</div>
          <div>
            <LogOut />
          </div>
        </div>
      </div>
    </div>
  );
}
