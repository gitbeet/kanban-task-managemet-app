import { useBoardData } from "../context/BoardDataContext";
import ColumnsList from "./ColumnsList";
import Columnv2 from "./Columnv2";

export default function BoardDisplayWindow() {
  const { currentBoard, boards } = useBoardData();
  return (
    <div>
      {/* <ColumnsList
        board={boards.find((board) => board.name === currentBoard).columns}
      /> */}
      <Columnv2 name="Todo" />
      <Columnv2 name="Doing" />
      <Columnv2 name="Done" />
    </div>
  );
}
