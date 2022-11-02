export default function Subtask({
  subtask,
  errorMessage,
  toggleSubtaskCompleted,
}) {
  return (
    <div
      onClick={() => toggleSubtaskCompleted(subtask.id)}
      className="cursor-pointer flex justify-start items-center space-x-6 p-4 rounded-sm bg-neutral-700 hover:bg-primary-600 hover:bg-opacity-25 dark:bg-primary-200 dark:hover:bg-primary-600 dark:hover:bg-opacity-25"
    >
      <div
        className={
          subtask.isCompleted
            ? "flex items-center justify-center w-4 h-4 bg-primary-600 border rounded-sm border-primary-450 border-opacity-25 "
            : "flex items-center justify-center w-4 h-4 bg-neutral-900 dark:bg-primary-300 border rounded-sm border-primary-450 border-opacity-25 "
        }
      >
        <svg
          className={subtask.isCompleted ? "block" : "hidden"}
          width="10"
          height="8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke="#FFF"
            strokeWidth="2"
            fill="none"
            d="m1.276 3.066 2.756 2.756 5-5"
          />
        </svg>
      </div>
      <div
        className={`w-full text-xs text-primary-500 ${
          subtask.isCompleted
            ? "line-through text-primary-500"
            : " text-primary-200 dark:text-neutral-900"
        } font-bold`}
      >
        {subtask.title}
      </div>
    </div>
  );
}
