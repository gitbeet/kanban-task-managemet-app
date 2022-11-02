import { useState } from "react";

export default function CurrentStatus({ tempTask, statusList, handleChange }) {
  const [open, setOpen] = useState();

  return (
    <div className="flex relative items-center">
      <select
        onClick={() => setOpen((prev) => !prev)}
        className="w-full"
        value={tempTask.status}
        onChange={(e) => handleChange({ status: e.target.value })}
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
}
