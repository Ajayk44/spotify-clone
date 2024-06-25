import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Button = forwardRef(
  ({ type, className, children, disabled, onClick }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          "w-full rounded-full bg-green-500 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition ",
          className
        )}
        disabled={disabled}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
