import Column from "./Column";
import { v4 as uuid } from "uuid";
import "../css/ColumnsList.css";

export default function ColumnsList({ board }) {
  return (
    <div className="columns-list">
      {board.map((column) => (
        <Column key={uuid()} column={column} />
      ))}
    </div>
  );
}
