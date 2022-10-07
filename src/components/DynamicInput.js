import { useBoardData } from "../context/BoardDataContext";
import "../css/DynamicInput.css";

export default function DynamicInput({ data, id }) {
  const { handleChangeNewBoard, newBoard } = useBoardData();

  const { columns } = newBoard;

  function handleColumnChange(columnChange) {
    const newColumns = [...columns];
    const index = newColumns.findIndex((i) => {
      return i.id === id;
    });
    console.log("index", index);
    newColumns[index] = { ...newColumns[index], ...columnChange };
    console.log("columnChange", columnChange);
    handleChangeNewBoard({ columns: newColumns });
  }

  // this works
  function handleColumnDelete() {
    handleChangeNewBoard({
      ...newBoard,
      columns: columns.filter((column) => {
        return column.id !== id;
      }),
    });
  }

  return (
    <div className="dynamic-input">
      <input
        onChange={(e) => handleColumnChange({ name: e.target.value })}
        value={data}
      />
      <svg
        onClick={handleColumnDelete}
        width="15"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#828FA3" fillRule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </div>
  );
}
