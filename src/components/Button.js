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
          ? `text-md bg-primary-600 text-neutral-900 rounded-full px-6  py-2  hover:bg-primary-700 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "primary" && size === "lg"
          ? `text-md bg-primary-600 text-neutral-900 rounded-full px-6  py-3  hover:bg-primary-700 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "secondary" && size === "sm"
          ? `text-md bg-neutral-500 text-primary-600 rounded-full px-6  py-2  hover:bg-neutral-400 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "secondary" && size === "lg"
          ? `text-md bg-neutral-500 text-primary-600 rounded-full px-6  py-3  hover:bg-neutral-400 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "danger" && size === "sm"
          ? `text-md bg-danger-500 text-neutral-900 rounded-full px-6  py-2  hover:bg-danger-600 transition-all ${
              disabled && "opacity-50"
            }`
          : `text-md bg-danger-500 text-neutral-900 rounded-full px-6  py-3  hover:bg-danger-600 transition-all ${
              disabled && "opacity-50"
            }`
      }
    >
      {text}
    </button>
  );
}
