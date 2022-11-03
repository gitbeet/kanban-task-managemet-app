import Backdrop from "./Backdrop";
import EditColumn from "./EditColumn";
import { v4 as uuid } from "uuid";
import Button from "./Button";
import * as ReactDOM from "react-dom";
import { useDarkMode } from "../context/DarkModeContext";
import useKeyboardControl from "../utilities/useKeyboardControl";
import { useState } from "react";
import { generateColor } from "../utilities/generateColor";
import InputElement from "./InputElement";

const CreateNewBoardWindow = ({
  newBoard,
  changeCurrentBoard,
  assignNewBoard,
  header,
  closeFunction,
  buttonText,
  submitFunction,
}) => {
  const { darkMode } = useDarkMode();
  const [tempBoard, setTempBoard] = useState(newBoard);

  const { columns } = tempBoard;

  const spawnNewEmptyBoard = () => {
    return {
      id: uuid(),
      name: "",
      columns: [],
      error: "",
      columnError: "",
    };
  };

  // this works
  const handleColumnAdd = () => {
    handleChange({
      ...tempBoard,
      columns: [
        ...columns,
        { id: uuid(), name: "", tasks: [], error: "", color: generateColor() },
      ],
    });
  };

  const saveChanges = () => {
    let temp = { ...tempBoard };

    if (temp.name.length === 0) {
      temp.error = "Can't be empty.";
    }

    if (
      temp.columns.length !==
      new Set([...temp.columns.map((col) => col.name.toLowerCase())]).size
    ) {
      temp.columnError = "Every column should have a unique name.";
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

    handleChange({ error: temp.error });
    handleChange({ columnError: temp.columnError });
    handleChange({ columns: temp.columns });

    if (
      temp.error ||
      temp.columns.findIndex((column) => column.error.length > 0) !== -1 ||
      temp.columnError
    ) {
      return;
    }

    submitFunction(tempBoard);
    changeCurrentBoard(tempBoard.id);
  };

  const handleChange = (changes) => {
    if (tempBoard.error) {
      setTempBoard((prev) => {
        return { ...prev, error: "" };
      });
    }
    setTempBoard((prev) => {
      return { ...prev, ...changes };
    });
  };

  const onClose = () => {
    closeFunction();
    assignNewBoard(spawnNewEmptyBoard());
  };

  useKeyboardControl(saveChanges, closeFunction);

  let zIndexWindow = buttonText === "Save Changes" ? "z-[700]" : "z-[300]";

  return ReactDOM.createPortal(
    <>
      <div
        className={
          darkMode ? `dark ${zIndexWindow} fixed ` : `${zIndexWindow} fixed`
        }
      >
        <div
          className={`scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-neutral-900 w-[min(90%,350px)] md:w-[450px] max-h-[90vh] overflow-auto rounded-md fixed top-[50vh] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-900 dark:bg-primary-300 dark:text-neutral-900 p-8 space-y-10`}
        >
          <div className="text-xl font-bold">{header}</div>

          <div className="space-y-2 relative">
            <InputElement
              value={tempBoard.name}
              onChange={(e) =>
                handleChange({ [e.target.name]: e.target.value })
              }
              error={tempBoard.error}
              label="Board Name"
              name="name"
              placeholder=""
              autoFocus={true}
            />
          </div>
          <div className="flex flex-col space-y-4 relative">
            <div className="flex flex-col space-y-4">
              <p className="text-sm -mb-2">Board Columns</p>
              <p
                className={`${
                  !tempBoard.handleChange && "hidden"
                } block text-sm text-danger-500 pt-2`}
              >
                {tempBoard.columnError}
              </p>
            </div>
            <div className="space-y-10">
              {tempBoard.columns.map((column) => {
                return (
                  <EditColumn
                    handleChange={handleChange}
                    tempBoard={tempBoard}
                    key={column.id}
                    id={column.id}
                    data={column.name}
                    errorMessage={column.error}
                    columnError={tempBoard.columnError}
                  />
                );
              })}
            </div>
            <div className="pt-8">
              <Button
                type="secondary"
                size="sm"
                text="+Add New Column"
                onClick={handleColumnAdd}
              />
            </div>
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
};

export default CreateNewBoardWindow;
