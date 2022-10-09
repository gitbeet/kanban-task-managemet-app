import React from "react";

export default function Button({
  onClick,
  text,
  type,
  size,
  disabled = false,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        type === "primary" && size === "sm"
          ? "text-md bg-primary-600 text-neutral-900 rounded-full px-6  py-2  hover:bg-primary-700 transition-all"
          : type === "primary" && size === "lg"
          ? "text-md bg-primary-600 text-neutral-900 rounded-full px-6  py-3  hover:bg-primary-700 transition-all"
          : type === "secondary" && size === "sm"
          ? "text-md bg-neutral-500 text-primary-600 rounded-full px-6  py-2  hover:bg-neutral-400 transition-all"
          : "text-md bg-neutral-500 text-primary-600 rounded-full px-6  py-3  hover:bg-neutral-400 transition-all"
      }
    >
      {text}
    </button>
  );
}
