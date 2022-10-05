import { useBoardData } from "../context/BoardDataContext";
import "../css/Subtask.css";

export default function Subtask({ subtask }) {
  const { toggleSubtaskCompleted } = useBoardData();
  return (
    <div className="subtask">
      <div
        className={
          subtask.isCompleted ? " subtask-completed" : "subtask-not-completed"
        }
        onClick={() => toggleSubtaskCompleted(subtask.title)}
      ></div>
      <div>{subtask.title}</div>
    </div>
  );
}
