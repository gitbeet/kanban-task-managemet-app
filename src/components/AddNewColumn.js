import { useState } from "react";

export default function AddNewColumn({ handleColumnAdd, closeFunction }) {
  const [columnName, setColumnName] = useState();

  function createColumn() {
    handleColumnAdd(columnName);
    closeFunction();
  }

  return (
    <div className="add-new-column">
      <label htmlFor="name">Column Name</label>
      <input onChange={(e) => setColumnName(e.target.value)} />
      <button onClick={createColumn} className="btn-secondary-sm">
        Add Column
      </button>
    </div>
  );
}
