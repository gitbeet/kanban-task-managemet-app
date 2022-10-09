import { v4 as uuid } from "uuid";
import Column from "./Column";

export default function ColumnsList({ board }) {
  return (
    <div className="flex space-x-6">
      {board.map((column) => (
        <Column key={uuid()} column={column} />
      ))}
    </div>
  );
}
