import { useBoardData } from "../context/BoardDataContext";
import "../css/Subtask.css";

export default function Subtask({ subtask }) {
  const { toggleSubtaskCompleted } = useBoardData();
  console.log(subtask.isCompleted);
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
