import * as ReactDOM from "react-dom";
import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import Button from "./Button";
import Backdrop from "./Backdrop";
import InputElement from "./InputElement";
import useKeyboardControl from "../utilities/useKeyboardControl";

const AddNewColumn = ({
  handleColumnAdd,
  closeFunction,
  currentBoardId,
  boards,
}) => {
  const { darkMode } = useDarkMode();
  const [columnName, setColumnName] = useState("");
  const [error, setError] = useState("");

  const handleChange = (changes) => {
    if (error) {
      setError("");
    }
    setColumnName(changes);
  };

  const validateInput = () => {
    let checkForRepeatingColumn = [...boards]
      .find((board) => board.id === currentBoardId)
      .columns.findIndex(
        (column) => column.name.toLowerCase() === columnName.toLowerCase()
      );

    if (columnName.length === 0) {
      setError("Can't be empty.");
      return false;
    }

    if (checkForRepeatingColumn !== -1) {
      setError("A column with that name already exists.");
      return false;
    }
    return true;
  };

  const createColumn = () => {
    if (!validateInput()) return;
    handleColumnAdd(columnName);
    closeFunction();
  };

  useKeyboardControl(createColumn, closeFunction);

  const menuContent = (
    <div className={darkMode && "dark"}>
      <div className="w-[min(90%,350px)] fixed flex flex-col z-[300] p-4 space-y-4 bg-neutral-900 dark:bg-primary-300 text-primary-100 dark:text-neutral-900 left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 rounded-md">
        <h2>Add a Column</h2>
        <InputElement
          value={columnName}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="e.g. Todo,Doing, etc."
          autoFocus={true}
          error={error}
          label="Column Name"
          name="name"
        />
        <div className="pt-10">
          <Button
            type="primary"
            size="sm"
            text="Add Column"
            onClick={createColumn}
            submit={true}
          />
        </div>
      </div>
      <div className="fixed z-[200]">
        <Backdrop clickFunction={closeFunction} opacity="100" />
      </div>
    </div>
  );

  return ReactDOM.createPortal(menuContent, document.getElementById("menu"));
};

export default AddNewColumn;
