import React from "react";
import { useBoardData } from "../context/BoardDataContext";

export default function EditStatus() {
  const { handleCangeNewTask, newTask, statusList } = useBoardData();

  return (
    <div>
      <select
        onChange={(e) => handleCangeNewTask({ status: e.target.value })}
        value={newTask.status}
      >
        {statusList.map((status, index) => (
          <option key={index}>{status}</option>
        ))}
      </select>
    </div>
  );
}
