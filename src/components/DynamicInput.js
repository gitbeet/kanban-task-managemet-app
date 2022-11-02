export default function DynamicInput({
  data,
  id,
  errorMessage,
  columnError,
  tempBoard,
  handleChange,
}) {
  const { columns } = tempBoard;

  function handleColumnChange(columnChange) {
    if (columnError) {
      handleChange({ columnError: "" });
    }

    const newColumns = [...columns];
    const index = newColumns.findIndex((i) => {
      return i.id === id;
    });
    console.log("index", index);
    newColumns[index] = { ...newColumns[index], ...columnChange, error: "" };
    console.log("columnChange", columnChange);
    handleChange({ columns: newColumns });
  }

  function handleColumnDelete() {
    handleChange({
      ...tempBoard,
      columns: columns.filter((column) => {
        return column.id !== id;
      }),
    });
  }

  return (
    <div className="flex relative justify-between items-center space-x-2  bg-neutral-900 border-primary-450 dark:bg-primary-300 space-y-2">
      <input
        className={` ${
          errorMessage ||
          columnError === "Every column should have a unique name."
            ? "placeholder:text-right border-opacity-100 border-danger-500 hover:border-danger-600"
            : "border-opacity-25 border-primary-500"
        } w-full bg-neutral-900 dark:bg-primary-300`}
        onChange={(e) => handleColumnChange({ name: e.target.value })}
        value={data}
      />
      <p className="text-sm text-danger-500 absolute top-full">
        {errorMessage || columnError}
      </p>
      <svg
        onClick={handleColumnDelete}
        className="cursor-pointer fill-[#828FA3] hover:fill-danger-500"
        width="15"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="current-color" fillRule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </div>
  );
}
