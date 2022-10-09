import TaskWindowMenu from "./TaskWindowMenu";

export default function EditDeleteMenu({ onClick, show, onEdit, onDelete }) {
  return (
    <div className=" flex justify-end items-center w-10 cursor-pointer relative">
      <svg
        onClick={onClick}
        width="5"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#828FA3" fillRule="evenodd">
          <circle cx="2.308" cy="2.308" r="2.308" />
          <circle cx="2.308" cy="10" r="2.308" />
          <circle cx="2.308" cy="17.692" r="2.308" />
        </g>
      </svg>
      {show && <TaskWindowMenu onEdit={onEdit} onDelete={onDelete} />}
    </div>
  );
}
