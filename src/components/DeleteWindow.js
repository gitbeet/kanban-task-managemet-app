import Backdrop from "./Backdrop";
import Button from "./Button";

export default function DeleteWindow({
  onDelete,
  onCancel,
  name,
  type,
  message,
}) {
  return (
    <>
      <div className="absolute z-[1100] w-[min(90%,350px)] md:w-[450px] bg-neutral-900 dark:bg-primary-300 text-primary-200 dark:text-neutral-900 rounded-md left-1/2 -translate-x-1/2 p-6 space-y-6">
        <div className="text-danger-500 text-lg font-bold">
          Delete this {type}?
        </div>
        <div className="text-sm  leading-7 text-primary-200 dark:text-primary-500">
          Are you sure you want to delete the ‘{name}’ {type}
          {message}
        </div>
        <div className="flex flex-col space-y-4">
          <Button onClick={onDelete} type="danger" text="Delete" size="sm" />
          <Button onClick={onCancel} type="secondary" text="Cancel" size="sm" />
        </div>
      </div>
      <Backdrop zIndex="1000" clickFunction={onCancel} />
    </>
  );
}
