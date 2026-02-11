"use client";
import { LogOut, Moon, Sun, UserIcon } from "lucide-react";
import { Button } from "./ButtonComponent";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggleComponent";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
  const logoutRef = useRef<HTMLButtonElement>(null)
  const route = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  });
  const handleLogout = async () => {
    localStorage.removeItem("token");
    route.push("/")
  };

  const showLogout = ()=>{
    if (!logoutRef.current) {
      return;
    }
    logoutRef.current.classList.toggle("hidden")
    logoutRef.current.classList.toggle("flex")
  }

  return (
    <div className="h-16 w-7xl mx-auto dark:border-2 border dark:bg-transparent bg-neutral-200/60  border-neutral-500/40 dark:border-cyan-500/30  rounded-2xl flex mt-2 px-4 py-3 items-center justify-between">
      <div className="text-2xl dark:text-white text-black font-bold text-shadow-lg">
        CollabCanvas{" "}
      </div>
      <div className="flex gap-4">
        <div className="flex items-center justify-center cursor-pointer text-white">
          <ThemeToggle />
        </div>

        {isLoggedIn ? (
          <>
            <div className="flex items-center justify-center cursor-pointer" onClick={showLogout}>
              <UserIcon />
            </div>
            <button ref={logoutRef} onClick={handleLogout} className="hidden cursor-pointer gap-2  items-center justify-center absolute top-24 right-9 p-2 border rounded-lg">
              Logout <LogOut />
            </button>
          </>
        ) : (
          <div className="flex gap-2 items-center justify-center">
            <Button
              size="sm"
              variant="primary"
              onClick={() => route.push("signin")}
            >
              Signin
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => route.push("signup")}
            >
              Signup
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
