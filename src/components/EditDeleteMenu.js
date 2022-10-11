import { useEffect, useRef } from "react";
import TaskWindowMenu from "./TaskWindowMenu";
import { findDOMNode } from "react-dom";

export default function EditDeleteMenu({
  onClick,
  show,
  onEdit,
  onDelete,
  onClose,
  backdropOpacity,
  onDisable,
}) {
  const myRef = useRef();

  return (
    <>
      <div
        ref={myRef}
        onClick={onClick}
        className="flex justify-end items-center w-10 cursor-pointer md:scale-125 "
      >
        <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
          <g fill="#828FA3" fillRule="evenodd">
            <circle cx="2.308" cy="2.308" r="2.308" />
            <circle cx="2.308" cy="10" r="2.308" />
            <circle cx="2.308" cy="17.692" r="2.308" />
          </g>
        </svg>
      </div>
      {show && (
        <TaskWindowMenu
          onEdit={onEdit}
          onDelete={onDelete}
          onClose={onClose}
          onDisable={onDisable}
          show={show}
          backdropOpacity={backdropOpacity}
          position={[
            myRef.current.getBoundingClientRect().left,
            myRef.current.getBoundingClientRect().top,
          ]}
        />
      )}
    </>
  );
}
