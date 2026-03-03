"use client";
import { LogOut, Moon, Sun, UserIcon } from "lucide-react";
import { Button } from "./ButtonComponent";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggleComponent";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
  const logoutRef = useRef<HTMLButtonElement>(null);
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
    route.push("/");
  };

  const showLogout = () => {
    if (!logoutRef.current) {
      return;
    }
    logoutRef.current.classList.toggle("hidden");
    logoutRef.current.classList.toggle("flex");
  };

  return (
    <div className=" mx-auto xl:mt-2 flex items-center justify-between rounded-2xl border border-neutral-500/40 bg-neutral-200/60 px-4 py-3 h-12 w-full xl:h-16 xl:w-7xl dark:border-2 dark:border-cyan-500/30 dark:bg-transparent">
      <div className="font-bold text-black text-shadow-lg text-lg xl:text-2xl dark:text-white">
        CanvasCraft{" "}
      </div>
      <div className="flex xl:gap-4">
        <div className="flex cursor-pointer items-center mr-2 justify-center text-white">
          <ThemeToggle />
        </div>

        {isLoggedIn ? (
          <>
            <div
              className="flex cursor-pointer items-center justify-center"
              onClick={showLogout}
            >
              <UserIcon />
            </div>
            <button
              ref={logoutRef}
              onClick={handleLogout}
              className="absolute top-24 right-9 hidden cursor-pointer items-center justify-center gap-2 rounded-lg border p-2"
            >
              Logout <LogOut />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center xl:gap-2">
            <div className="hidden xl:block">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => route.push("signup")}
              >
                Signup
              </Button>
            </div>
            <div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => route.push("signin")}
              >
                Signin
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
