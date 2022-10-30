export default function InputElement({
  value,
  onChange,
  error,
  label,
  name = "",
  placeholder,
  autoFocus = false,
}) {
  return (
    <div className="flex flex-col space-y-2 relative">
      <label className="text-sm text-primary-500" htmlFor={name}>
        {label}
      </label>
      <input
        className={"dark:bg-primary-300"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus
      />
      <p className="text-danger-500 text-sm block absolute top-full">{error}</p>
    </div>
  );
}
