import { useEffect, useState } from "react";

const EditStatus = ({ statusList, type, handleChange, tempTask }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (type === "new") {
      handleChange({ status: statusList[0] });
    }
  }, []);

  return (
    <div className="flex relative items-center">
      <select
        onClick={() => setOpen((prev) => !prev)}
        className="w-[100%] border-opacity-25 border-primary-500 bg-neutral-900  dark:bg-primary-300 w"
        onChange={(e) => handleChange({ status: e.target.value })}
        value={tempTask.status || statusList[0]}
      >
        {statusList.map((status, index) => (
          <option key={index}>{status}</option>
        ))}
      </select>
      <svg
        className={`absolute right-4 ${open && "hidden"}`}
        width="10"
        height="7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
      </svg>
      <svg
        className={`absolute right-4 ${!open && "hidden"}`}
        width="10"
        height="7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6" />
      </svg>
    </div>
  );
};

export default EditStatus;
