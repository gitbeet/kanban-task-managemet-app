import Backdrop from "./Backdrop";
import { useBoardData } from "../context/BoardDataContext";
import DynamicInput from "./DynamicInput";
import { v4 as uuid } from "uuid";
import Button from "./Button";

export default function CreateNewBoardWindow({
  header,
  closeFunction,
  buttonText,
  submitFunction,
  disabled = false,
}) {
  const { newBoard, handleChangeNewBoard, changeCurrentBoard } = useBoardData();
  const { columns } = newBoard;

  // this works
  function handleColumnAdd() {
    handleChangeNewBoard({
      ...newBoard,
      columns: [...columns, { id: uuid(), name: "", tasks: [] }],
    });
  }

  function saveChanges() {
    submitFunction();
    changeCurrentBoard(newBoard.id);
  }

  return (
    <>
      <div className="w-[min(90%,350px)] md:w-[450px] rounded-md absolute left-1/2 -translate-x-1/2 z-50 bg-neutral-900 dark:bg-primary-300 dark:text-neutral-900 p-8 space-y-7">
        <div className="text-xl font-bold">{header}</div>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm text-neutral-900">
            Board Name
          </label>
          <input
            name="name"
            className="border-opacity-25 border-primary-500 bg-neutral-900  dark:bg-primary-300 w-full"
            value={newBoard.name}
            onChange={(e) =>
              handleChangeNewBoard({ [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col space-y-4">
          <p className="text-sm -mb-2">Board Columns</p>
          {newBoard.columns.map((column) => {
            return (
              <DynamicInput
                key={column.id}
                id={column.id}
                data={column.name}
                handleChangeFunc={handleChangeNewBoard}
              />
            );
          })}
          <Button
            type="secondary"
            size="sm"
            text="+Add New Column"
            onClick={handleColumnAdd}
          />
        </div>
        <div className="flex flex-col">
          <Button
            disabled={disabled}
            type="primary"
            size="sm"
            text={buttonText}
            onClick={saveChanges}
          />
        </div>
      </div>
      <Backdrop clickFunction={closeFunction} />
    </>
  );
}
