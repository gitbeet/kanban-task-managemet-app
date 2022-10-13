import Backdrop from "./Backdrop";
import { useBoardData } from "../context/BoardDataContext";
import DynamicInput from "./DynamicInput";
import { v4 as uuid } from "uuid";
import Button from "./Button";
import * as ReactDOM from "react-dom";
import { useDarkMode } from "../context/DarkModeContext";

export default function CreateNewBoardWindow({
  header,
  closeFunction,
  buttonText,
  submitFunction,
  disabled = false,
}) {
  const { darkMode } = useDarkMode();
  const {
    newBoard,
    handleChangeNewBoard,
    changeCurrentBoard,
    assignNewBoard,
    spawnNewEmptyBoard,
  } = useBoardData();
  const { columns } = newBoard;

  // this works
  function handleColumnAdd() {
    handleChangeNewBoard({
      ...newBoard,
      columns: [...columns, { id: uuid(), name: "", tasks: [], error: "" }],
    });
  }

  function saveChanges() {
    let temp = { ...newBoard };

    if (temp.name.length === 0) {
      temp.error = "Can't be empty.";
    }

    temp = {
      ...temp,
      columns: temp.columns.map((c) => {
        if (c.name.length === 0) {
          return { ...c, error: "Can't be empty." };
        } else {
          return c;
        }
      }),
    };

    handleChangeNewBoard({ error: temp.error });
    handleChangeNewBoard({ columns: temp.columns });

    if (
      temp.name.length === 0 ||
      temp.columns.findIndex((column) => column.error.length > 0) !== -1
    ) {
      return;
    }

    submitFunction();
    changeCurrentBoard(newBoard.id);
  }

  function handleChange(changes) {
    handleChangeNewBoard(changes);
    if (newBoard.error) {
      handleChangeNewBoard({ error: "" });
    }
  }

  function onClose() {
    closeFunction();
    assignNewBoard(spawnNewEmptyBoard());
  }

  let zIndexWindow = buttonText === "Save Changes" ? "z-[700]" : "z-[300]";

  return ReactDOM.createPortal(
    <>
      <div
        className={
          darkMode ? `dark ${zIndexWindow} fixed ` : `${zIndexWindow} fixed`
        }
      >
        <div
          className={`w-[min(90%,350px)] md:w-[450px] rounded-md fixed top-1/4 left-1/2 -translate-x-1/2 bg-neutral-900 dark:bg-primary-300 dark:text-neutral-900 p-8 space-y-7`}
        >
          <div className="text-xl font-bold">{header}</div>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-neutral-900">
              Board Name
            </label>
            <input
              name="name"
              className={`  bg-neutral-900  dark:bg-primary-300 w-full ${
                newBoard.error
                  ? "placeholder-danger-500  hover:border-danger-600 hover:placeholder:text-danger-600 placeholder:text-right border-danger-500"
                  : "border-opacity-25 border-primary-500"
              }`}
              value={newBoard.name}
              onChange={(e) =>
                handleChange({ [e.target.name]: e.target.value })
              }
              placeholder={newBoard.error}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <p className="text-sm -mb-2">Board Columns</p>
            {newBoard.columns.map((column) => {
              return (
                <DynamicInput
                  key={column.id}
                  id={column.id}
                  data={column.name}
                  handleChangeFunc={handleChangeNewBoard}
                  errorMessage={
                    newBoard.columns.find((c) => c.id === column.id).error
                  }
                />
              );
            })}
            <Button
              type="secondary"
              size="sm"
              text="+Add New Column"
              onClick={handleColumnAdd}
            />
          </div>
          <div className="flex flex-col">
            <Button
              type="primary"
              size="sm"
              text={buttonText}
              onClick={saveChanges}
            />
          </div>
        </div>
      </div>
      <div
        className={
          buttonText === "Save Changes" ? "fixed z-[650]" : "fixed z-[200]"
        }
      >
        <Backdrop clickFunction={onClose} />
      </div>
    </>,
    document.getElementById("menu")
  );
}
