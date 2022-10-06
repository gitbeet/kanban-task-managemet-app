import React from "react";
import { useBoardData } from "../context/BoardDataContext";

export default function EditStatus(type) {
  const { handleCangeNewTask, newTask, statusList, viewedTask } =
    useBoardData();
  return (
    <div>
      <select
        onChange={(e) => handleCangeNewTask(type, { status: e.target.value })}
        value={type === "edit" ? viewedTask.status : newTask.status}
      >
        {statusList.map((status, index) => (
          <option key={index}>{status}</option>
        ))}
      </select>
    </div>
  );
}
