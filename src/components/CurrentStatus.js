import { useBoardData } from "../context/BoardDataContext";

export default function CurrentStatus({ task }) {
  const { handleChangeTaskStatus, statusList } = useBoardData();
  return (
    <div>
      <select
        value={task.status}
        onChange={(e) =>
          handleChangeTaskStatus(e.target.value, task, task.status)
        }
      >
        {statusList.map((status) => (
          <option>{status}</option>
        ))}
      </select>
    </div>
  );
}
