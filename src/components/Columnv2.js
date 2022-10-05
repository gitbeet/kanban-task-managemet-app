import { useBoardData } from "../context/BoardDataContext";
import Task from "./Task";

export default function Columnv2({ name }) {
  const { boardsv2 } = useBoardData();

  return (
    <div>
      {boardsv2
        .filter((task) => task.status === name)
        .map((task) => (
          <Task task={task} />
        ))}
    </div>
  );
}
