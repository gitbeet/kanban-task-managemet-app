import { useBoardData } from "../context/BoardDataContext";

export default function CurrentStatus({ task }) {
  const { handleChangeTaskStatus } = useBoardData();
  return (
    <div>
      <select
        value={task.status}
        onChange={(e) => handleChangeTaskStatus(e.target.value)}
      >
        <option>Todo</option>
        <option>Doing</option>
        <option>Done</option>
      </select>
    </div>
  );
}
