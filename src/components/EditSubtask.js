import InputElement from "./InputElement";

const EditSubtask = ({
  handleChange,
  subtask,
  tempTask,
  errorMessage = "",
}) => {
  const handleChangeSubtask = (changes) => {
    const updatedSubtasks = { ...tempTask }.subtasks;
    const index = updatedSubtasks.findIndex((subt) => subt.id === subtask.id);
    updatedSubtasks[index] = { ...subtask, ...changes, error: "" };
    handleChange(updatedSubtasks);
  };

  const handleDeleteSubtask = () => {
    const updatedSubtasks = { ...tempTask }.subtasks.filter(
      (subt) => subt.id !== subtask.id
    );
    handleChange({ subtasks: updatedSubtasks });
  };

  return (
    <div className="flex justify-between items-center space-x-2">
      <div className="w-[90%] md:min-w-[92%]">
        <InputElement
          value={subtask.title}
          onChange={(e) => handleChangeSubtask({ title: e.target.value })}
          label=""
          name=""
          error={errorMessage}
        />
      </div>
      <svg
        className="cursor-pointer fill-[#828FA3] hover:fill-danger-500 w-full "
        onClick={handleDeleteSubtask}
        width="15"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="current-color" fillRule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </div>
  );
};

export default EditSubtask;
