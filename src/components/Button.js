const Button = ({ onClick, text, type, size, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      tabIndex={0}
      onClick={onClick}
      className={
        type === "primary" && size === "sm"
          ? `w-full text-md bg-primary-600 text-neutral-900 rounded-full shadow-lg px-6  py-2  hover-hover:hover:bg-primary-700 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "primary" && size === "lg"
          ? `w-full text-md bg-primary-600 text-neutral-900 rounded-full shadow-lg px-6  py-3  hover-hover:hover:bg-primary-700 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "secondary" && size === "sm"
          ? `w-full text-md bg-neutral-500 text-primary-600 rounded-full shadow-lg px-6  py-2  hover-hover:hover:bg-neutral-400 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "secondary" && size === "lg"
          ? `w-full text-md bg-neutral-500 text-primary-600 rounded-full shadow-lg px-6  py-3  hover-hover:hover:bg-neutral-400 transition-all ${
              disabled && "opacity-50"
            }`
          : type === "danger" && size === "sm"
          ? `w-full text-md bg-danger-500 text-neutral-900 rounded-full shadow-lg px-6  py-2  hover-hover:hover:bg-danger-600 transition-all ${
              disabled && "opacity-50"
            }`
          : `w-full text-md bg-danger-500 text-neutral-900 rounded-full shadow-lg px-6  py-3  hover-hover:hover:bg-danger-600 transition-all ${
              disabled && "opacity-50"
            }`
      }
    >
      {text}
    </button>
  );
};

export default Button;
