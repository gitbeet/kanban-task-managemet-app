import React from "react";
import { useBoardData } from "../context/BoardDataContext";

export default function EditStatus({ type }) {
  const { handleCangeNewTask, statusList, viewedTask } = useBoardData();
  return (
    <div>
      <select
        onChange={(e) => handleCangeNewTask(type, { status: e.target.value })}
        value={viewedTask.status || "Todo"}
      >
        {statusList.map((status, index) => (
          <option key={index}>{status}</option>
        ))}
      </select>
    </div>
  );
}
