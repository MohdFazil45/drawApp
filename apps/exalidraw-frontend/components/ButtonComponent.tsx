import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant: "primary" | "secondary";
  onClick?: () => void;
  size: "sm" | "lg";
  type?:"submit" | "reset" | "button" | undefined
}

export const Button = ({
  children,
  className,
  variant,
  onClick,
  size,
  type
}: ButtonProps) => {
  const baseStyles =
    "transition-all duration-300 flex items-center justify-center cursor-pointer rounded-md dark:text-shadow-xs/25 text-shadow-lg";
  const varientStyle = {
    primary: "text-cyan-500/80  border-cyan-500/80 border-1 hover:bg-neutral-50/10 shadow-xl/20 font-medium hover:text-cyan-700 hover:border-cyan-600  hover:scale-[1.02]",
    secondary: "bg-cyan-500 border-cyan-500  text-white font-bold hover:bg-cyan-500/70 shadow-lg shadow-cyan-500/30  hover:scale-[1.02] inline-flex ",
  };
  const sizeStyles = {
    sm: "py-2 px-5 text-sm ",
    lg: "py-3 px-12 text-xl",
  };
  return (
    <button
      className={cn(
        `${sizeStyles[size]} ${baseStyles} ${varientStyle[variant]}`,
        className,
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

