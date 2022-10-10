import { useState } from "react";
import Button from "./Button";

export default function AddNewColumn({ handleColumnAdd, closeFunction }) {
  const [columnName, setColumnName] = useState();

  function createColumn() {
    handleColumnAdd(columnName);
    closeFunction();
  }

  return (
    <div className="w-[min(90%,350px)] absolute flex flex-col z-[1200] p-4 space-y-4 bg-neutral-900 dark:bg-primary-300 text-primary-100 dark:text-neutral-900 left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 rounded-md">
      <h2>Add a Column</h2>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-primary-500" htmlFor="name">
          Column Name
        </label>
        <input
          className="dark:bg-primary-300"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
        />
      </div>
      <Button
        type="primary"
        size="sm"
        text="Add Column"
        onClick={createColumn}
      />
    </div>
  );
}
