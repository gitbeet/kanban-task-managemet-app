import { useEffect, useRef, useState } from "react";
import TaskWindowMenu from "./TaskWindowMenu";

const EditDeleteMenu = ({
  onClick,
  show,
  onEdit,
  onDelete,
  onClose,
  backdropOpacity,
  onDisable,
  buttonText,
}) => {
  const myRef = useRef();

  const [pos, setPos] = useState([]);

  useEffect(() => {
    if (!myRef) return;
    function handleResize() {
      setPos([
        myRef.current.getBoundingClientRect().left,
        myRef.current.getBoundingClientRect().top,
      ]);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      <div
        ref={myRef}
        onClick={onClick}
        className="flex justify-center items-center w-10 cursor-pointer md:scale-125 "
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
          buttonText={buttonText}
          onEdit={onEdit}
          onDelete={onDelete}
          onClose={onClose}
          onDisable={onDisable}
          show={show}
          backdropOpacity={backdropOpacity}
          position={[
            pos[0] || myRef.current.getBoundingClientRect().left,
            pos[1] || myRef.current.getBoundingClientRect().top,
          ]}
        />
      )}
    </>
  );
};

export default EditDeleteMenu;
