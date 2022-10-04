import { usePopUp } from "../context/PopUpContext";
import Backdrop from "./Backdrop";
import "../css/TaskViewWindow.css";
import Subtask from "./Subtask";
import { v4 as uuid } from "uuid";
import { useBoardData } from "../context/BoardDataContext";
import CurrentStatus from "./CurrentStatus";

export default function TaskViewWindow() {
  const { closeTaskViewWindow, viewedTask } = usePopUp();
  const { boards, currentBoard } = useBoardData();
  const { title, description } = viewedTask[0];

  const realsubtasks = boards
    .find((board) => board.name === currentBoard)
    .columns.find((column) => column.name === viewedTask[1])
    .tasks.find((task) => task.title === viewedTask[0]).subtasks;

  const currentTask = boards
    .find((board) => board.name === currentBoard)
    .columns.find((column) => column.name === viewedTask[1])
    .tasks.find((task) => task.title === viewedTask[0]);

  return (
    <>
      <div className="task-view-window">
        <header>{currentTask.title}</header>
        <main>{currentTask.description}</main>
        <section>
          {realsubtasks.map((subtask) => (
            <Subtask
              key={uuid()}
              taskTitle={title}
              taskDescription={description}
              subtask={subtask}
            />
          ))}
        </section>
        <div>Current Status</div>
        <CurrentStatus task={currentTask} />
      </div>
      <Backdrop clickFunction={closeTaskViewWindow} />
    </>
  );
}
