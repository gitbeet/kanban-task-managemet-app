import { useBoardData } from "../context/BoardDataContext";
import ColumnsList from "./ColumnsList";

export default function BoardDisplayWindow() {
  const { currentBoard, boards } = useBoardData();
  return (
    <div>
      <ColumnsList
        board={boards.find((board) => board.id === currentBoard).columns}
      />
    </div>
  );
}
