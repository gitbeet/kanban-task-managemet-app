import Backdrop from "./Backdrop";
import { usePopUp } from "../context/PopUpContext";
import { useDarkMode } from "../context/DarkModeContext";
import { useBoardData } from "../context/BoardDataContext";
import "../css/CreateNewBoardWindow.css";
import DynamicInput from "./DynamicInput";
import { v4 as uuid } from "uuid";

export default function CreateNewBoardWindow({
  header,
  closeFunction,
  buttonText,
  submitFunction,
}) {
  const { darkMode } = useDarkMode();
  const { newBoard, handleChangeNewBoard } = useBoardData();
  const { columns } = newBoard;

  // this works
  function handleColumnAdd() {
    handleChangeNewBoard({
      ...newBoard,
      columns: [...columns, { id: uuid(), name: "" }],
    });
  }

  return (
    <>
      <div
        className={
          darkMode
            ? "create-new-board bg-dark-300 text-neutral-900"
            : "create-new-board bg-light-900 text-primary-100"
        }
      >
        <div>{header}</div>
        <label htmlFor="name">Board Name</label>
        <input
          value={newBoard.name}
          onChange={(e) =>
            handleChangeNewBoard({ [e.target.name]: e.target.value })
          }
          name="name"
        />
        {newBoard.columns.map((column) => {
          return (
            <DynamicInput
              key={column.id}
              id={column.id}
              data={column.name}
              handleChangeFunc={handleChangeNewBoard}
            />
          );
        })}
        <button onClick={handleColumnAdd} className="btn-secondary-sm">
          +Add New Column
        </button>
        <button onClick={submitFunction} className="btn-primary-sm">
          {buttonText}
        </button>
      </div>
      <Backdrop clickFunction={closeFunction} />
    </>
  );
}
