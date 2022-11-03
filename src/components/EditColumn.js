import InputElement from "./InputElement";

const EditColumn = ({
  data,
  id,
  errorMessage,
  columnError,
  tempBoard,
  handleChange,
}) => {
  const { columns } = tempBoard;

  const handleColumnChange = (columnChange) => {
    if (columnError) {
      handleChange({ columnError: "" });
    }

    const newColumns = [...columns];
    const index = newColumns.findIndex((i) => {
      return i.id === id;
    });
    newColumns[index] = { ...newColumns[index], ...columnChange, error: "" };
    handleChange({ columns: newColumns });
  };

  const handleColumnDelete = () => {
    handleChange({
      ...tempBoard,
      columns: columns.filter((column) => {
        return column.id !== id;
      }),
    });
  };

  return (
    <div className="flex relative justify-between items-center space-x-2  bg-neutral-900 border-primary-450 dark:bg-primary-300 space-y-2">
      <div className="w-full">
        <InputElement
          type="input"
          value={data}
          onChange={(e) => handleColumnChange({ name: e.target.value })}
          error={errorMessage || columnError}
          label=""
          name=""
          placeholder=""
        />
      </div>
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
};

export default EditColumn;
