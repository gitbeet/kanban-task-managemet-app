import { usePopUp } from "../context/PopUpContext";
import Backdrop from "./Backdrop";
import "../css/TaskViewWindow.css";
import Subtask from "./Subtask";
import { v4 as uuid } from "uuid";
import { useBoardData } from "../context/BoardDataContext";
import CurrentStatus from "./CurrentStatus";

export default function TaskViewWindow() {
  const { viewedTask, viewedTaskColumn } = useBoardData();
  const { closeTaskViewWindow } = usePopUp();
  const { handleChangeTaskStatusClose } = useBoardData();
  const { title, description } = viewedTask;

  function onClickBackdrop() {
    closeTaskViewWindow();
    handleChangeTaskStatusClose();
  }

  return (
    <>
      {/* test comment */}
      <div className="task-view-window">
        <header>{viewedTask.title}</header>
        <main>{viewedTask.description}</main>
        <section>
          {viewedTask.subtasks.map((subtask) => (
            <Subtask
              key={uuid()}
              taskTitle={title}
              taskDescription={description}
              subtask={subtask}
            />
          ))}
        </section>
        <div>Current Status</div>
        <CurrentStatus />
      </div>
      <Backdrop clickFunction={onClickBackdrop} />
    </>
  );
}
