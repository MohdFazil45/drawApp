import { Moon, Sun } from "lucide-react";
import { Button } from "./ButtonComponent";

export default function NavBar() {
  const isDarkMode: boolean = true;
  return (
    <div className="h-16 w-7xl mx-auto border-2 border-white/30 rounded-2xl flex mt-2 px-4 py-3 items-center justify-between">
      <div className="text-2xl dark:text-white text-black font-bold text-shadow-lg">DrawApp </div>
      <div className="flex gap-4">
        <div className="flex items-center justify-center cursor-pointer text-white">
          {isDarkMode ? <Sun /> : <Moon />}
        </div>
        <Button
          size="sm"
          variant="primary"
        >
          Signin  
        </Button>
        <Button
          size="sm"
          variant="secondary"
        >
          Signup
        </Button>
      </div>
    </div>
  );
}
