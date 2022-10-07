import React, { useEffect } from "react";
import { useBoardData } from "../context/BoardDataContext";

export default function EditStatus({ type }) {
  const { handleCangeNewTask, viewedTask, boards, currentBoard } =
    useBoardData();

  const statusList = [...boards]
    .find((board) => {
      return board.id === currentBoard;
    })
    .columns.map((column) => {
      return column.name;
    });

  useEffect(() => {
    if (type === "new") {
      handleCangeNewTask({ status: statusList[0] });
    }
  }, []);

  return (
    <div>
      <select
        onChange={(e) => handleCangeNewTask({ status: e.target.value })}
        value={viewedTask.status || statusList[0]}
      >
        {statusList.map((status, index) => (
          <option key={index}>{status}</option>
        ))}
      </select>
    </div>
  );
}
