import { useBoardData } from "../context/BoardDataContext";

export default function CurrentStatus() {
  const { viewedTask, handleChangeTaskStatus, statusList } = useBoardData();
  return (
    <div>
      <select
        value={viewedTask.status}
        onChange={(e) => handleChangeTaskStatus(e.target.value)}
      >
        {statusList.map((status, index) => (
          <option key={index}>{status}</option>
        ))}
      </select>
    </div>
  );
}
