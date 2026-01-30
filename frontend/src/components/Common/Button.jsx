import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  onClick,
  variant = "primary",
  className,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded border font-bold transition-all duration-200 text-sm tracking-wide uppercase shadow-[0_0_10px_rgba(0,0,0,0.5)]";

  const variants = {
    primary:
      "bg-green-600 text-black border-green-500 hover:bg-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)]",
    outline:
      "bg-transparent text-green-500 border-green-800 hover:border-green-500 hover:bg-green-900/20",
    danger:
      "bg-red-900/20 text-red-500 border-red-900 hover:bg-red-900/40 hover:border-red-500",
    ghost:
      "bg-transparent text-gray-500 border-transparent hover:text-green-400",
  };

  return (
    <button
      onClick={onClick}
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
