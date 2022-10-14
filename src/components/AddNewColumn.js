import * as ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { useBoardData } from "../context/BoardDataContext";
import Button from "./Button";
import Backdrop from "./Backdrop";

export default function AddNewColumn({ handleColumnAdd, closeFunction }) {
  const { currentBoard, boards } = useBoardData();
  const { darkMode } = useDarkMode();
  const [columnName, setColumnName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Enter") {
        createColumn();
      }
      if (e.key === "Escape") {
        closeFunction();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  function handleChange(changes) {
    // CLEAR THE ERROR ON TYPING SO IF YOU CLOSE AND REOPEN IT DOESN'T SHOW AN ERROR
    if (error) {
      setError("");
    }
    setColumnName(changes);
  }

  function validate() {
    let p = [...boards]
      .find((board) => board.id === currentBoard)
      .columns.findIndex((column) => column.name === columnName);

    if (columnName.length === 0) {
      setError("Can't be empty.");
      console.log(error);
      return false;
    }
    if (p !== -1) {
      setError("A column with that name already exists.");
      console.log(error);
      return false;
    }

    return true;
  }

  function createColumn() {
    console.log(error, columnName);
    if (!validate()) return;
    handleColumnAdd(columnName);
    closeFunction();
  }

  return ReactDOM.createPortal(
    <div className={darkMode && "dark"}>
      <div className="w-[min(90%,350px)] fixed flex flex-col z-[300] p-4 space-y-4 bg-neutral-900 dark:bg-primary-300 text-primary-100 dark:text-neutral-900 left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 rounded-md">
        <h2>Add a Column</h2>
        <div className="flex flex-col space-y-2 relative">
          <label className="text-sm text-primary-500" htmlFor="name">
            Column Name
          </label>
          <input
            className={"dark:bg-primary-300"}
            value={columnName}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={"e.g. Todo,Doing, etc."}
            autoFocus
          />
          <p className="text-danger-500 text-sm block absolute top-full">
            {error}
          </p>
        </div>
        <div className="pt-6">
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
    </div>,
    document.getElementById("menu")
  );
}
