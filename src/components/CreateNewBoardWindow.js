import Backdrop from "./Backdrop";
import { usePopUp } from "../context/PopUpContext";
import { useDarkMode } from "../context/DarkModeContext";
import { useBoardData } from "../context/BoardDataContext";
import "../css/CreateNewBoardWindow.css";
import DynamicInput from "./DynamicInput";
import { v4 as uuid } from "uuid";

export default function CreateNewBoardWindow() {
  const { toggleCreateNewBoardWindow } = usePopUp();
  const { darkMode } = useDarkMode();
  const { newBoard, handleChangeNewBoard, createNewBoard } = useBoardData();
  const { columns, name } = newBoard;

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
        <div>Add New Board</div>
        <label htmlFor="name">Board Name</label>
        <input
          // this works
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
              handleChangeFunc={handleChangeNewBoard}
              data={column.name}
            />
          );
        })}
        <button onClick={handleColumnAdd} className="btn-secondary-sm">
          +Add New Column
        </button>
        <button onClick={createNewBoard} className="btn-primary-sm">
          Create New Board
        </button>
      </div>
      <Backdrop clickFunction={toggleCreateNewBoardWindow} />
    </>
  );
}
