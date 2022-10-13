import { useState } from "react";
import Button from "./Button";
import { useDarkMode } from "../context/DarkModeContext";
import Backdrop from "./Backdrop";
import * as ReactDOM from "react-dom";

export default function AddNewColumn({
  handleColumnAdd,
  closeFunction,
  disabled,
}) {
  const { darkMode } = useDarkMode();
  const [columnName, setColumnName] = useState("");
  const [error, setError] = useState("");

  function handleChange(changes) {
    setColumnName(changes);
    if (error) {
      setError("");
    }
  }

  function createColumn() {
    if (columnName.length === 0) {
      setError("Can't be empty.");
      return;
    }
    handleColumnAdd(columnName);
    closeFunction();
  }

  return ReactDOM.createPortal(
    <div className={darkMode && "dark"}>
      <div className="w-[min(90%,350px)] fixed flex flex-col z-[300] p-4 space-y-4 bg-neutral-900 dark:bg-primary-300 text-primary-100 dark:text-neutral-900 left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 rounded-md">
        <h2>Add a Column</h2>
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-primary-500" htmlFor="name">
            Column Name
          </label>
          <input
            className={`${
              error &&
              "placeholder:text-danger-500 placeholder:text-right border-danger-500 border-opacity-100 hover:border-danger-600  hover:placeholder:text-danger-600"
            } dark:bg-primary-300`}
            value={columnName}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={error}
          />
        </div>
        <Button
          type="primary"
          size="sm"
          text="Add Column"
          onClick={createColumn}
        />
      </div>
      <div className="fixed z-[200]">
        <Backdrop clickFunction={closeFunction} opacity="100" />
      </div>
    </div>,
    document.getElementById("menu")
  );
}
