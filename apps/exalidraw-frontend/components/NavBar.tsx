"use client"
import { Moon, Sun } from "lucide-react";
import { Button } from "./ButtonComponent";
import { useRouter } from "next/navigation";
import Theme from "./ThemeToggle";

export default function NavBar() {
  const route = useRouter()
  return (
    <div className="h-16 w-7xl mx-auto border-2 border-white/30 rounded-2xl flex mt-2 px-4 py-3 items-center justify-between">
      <div className="text-2xl dark:text-white text-black font-bold text-shadow-lg">CollabCanvas </div>
      <div className="flex gap-4">
        <div className="flex items-center justify-center cursor-pointer text-white">
          <Theme/>
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={()=>route.push("signin")}
        >
          Signin  
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={()=> route.push("signup")}
        >
          Signup
        </Button>
      </div>
    </div>
  );
}
