export default function TaskWindowMenu({ onEdit, onDelete }) {
  return (
    <div className="absolute border border-primary-450 bg-neutral-900 dark:bg-primary-300 text-primary-200 dark:text-neutral-900 py-4  shadow-lg rounded-md space-y-4 left-[90%] -translate-x-full">
      <div
        className="cursor-pointer hover:bg-primary-600 pl-3 pr-8"
        onClick={onEdit}
      >
        Edit
      </div>
      <div
        className="cursor-pointer hover:bg-primary-600 pl-3 pr-8"
        onClick={onDelete}
      >
        Delete
      </div>
    </div>
  );
}
