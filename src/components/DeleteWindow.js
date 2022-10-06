export default function DeleteWindow({
  onDelete,
  onCancel,
  name,
  type,
  message,
}) {
  return (
    <div className="add-new-task-window">
      <div>Delete this {type}?</div>
      <div>
        Are you sure you want to delete the ‘{name}’ {type}
        {message}
      </div>
      <button onClick={onDelete} className="btn-danger-sm">
        Delete
      </button>
      <button onClick={onCancel} className="btn-secondary-sm">
        Cancel
      </button>
    </div>
  );
}
