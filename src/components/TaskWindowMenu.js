export default function TaskWindowMenu({ onEdit, onDelete }) {
  return (
    <div className="task-view-menu">
      <div onClick={onEdit}>Edit</div>
      <div onClick={onDelete}>Delete</div>
    </div>
  );
}
