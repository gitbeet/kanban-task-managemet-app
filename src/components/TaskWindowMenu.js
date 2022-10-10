export default function TaskWindowMenu({
  onEdit,
  onDelete,
  onClose,
  onDisable = false,
}) {
  return (
    <>
      <div className="absolute  border-primary-450 bg-neutral-900 dark:bg-primary-300 text-primary-200 dark:text-neutral-900 py-4  shadow-lg rounded-md space-y-4 top-12 left-[calc(100%-2rem)] -translate-x-full z-[1200]">
        <div
          className="cursor-pointer hover:bg-primary-600 pl-3 pr-8 py-2 mr-3 rounded-r-full font-bold"
          onClick={onEdit}
        >
          Edit
        </div>
        <button
          className="disabled:opacity-30 cursor-pointer hover:bg-primary-600 pl-3 pr-8 py-2 mr-3 rounded-r-full font-bold "
          onClick={onDelete}
          disabled={onDisable}
        >
          Delete
        </button>
      </div>
    </>
  );
}
