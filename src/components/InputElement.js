const InputElement = ({
  type = "input",
  value,
  onChange,
  error,
  label = "",
  name = "",
  placeholder = "",
  autoFocus = false,
}) => {
  return (
    <>
      {label ? (
        <label
          className="text-primary-500 text-xs opacity-75 font-bold dark:text-neutral-900 dark:opacity-100"
          htmlFor={name}
        >
          {label}
        </label>
      ) : null}
      {type === "input" ? (
        <div className="relative flex flex-col min-w-full space-y-2">
          <input
            className={`${
              error
                ? "border-danger-500 hover:border-danger-600 border-opacity-100 "
                : "border-primary-500 border-opacity-25 "
            } bg-neutral-900  dark:bg-primary-300`}
            placeholder={`${placeholder}`}
            autoFocus={autoFocus}
            value={value}
            onChange={onChange}
            name={name}
          />
          <p className="text-danger-500 text-sm  block absolute top-full w-full text-right">
            {error}
          </p>
        </div>
      ) : null}
      {type === "textarea" ? (
        <textarea
          rows={4}
          className="resize-none border-opacity-25 border-primary-500 bg-neutral-900  dark:bg-primary-300 w"
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={value}
          onChange={onChange}
          name={name}
        />
      ) : null}
    </>
  );
};

export default InputElement;
