import { useBoardData } from "../context/BoardDataContext";

export default function CurrentStatus() {
  const { viewedTask, handleChangeTaskStatus, statusList } = useBoardData();
  return (
    <div>
      <select
        value={viewedTask.status}
        onChange={(e) => handleChangeTaskStatus(e.target.value)}
      >
        {statusList.map((status) => (
          <option>{status}</option>
        ))}
      </select>
    </div>
  );
}
