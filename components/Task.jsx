import Button from "@/components/Button";
import useTasks from "@/hooks/useTasks";
import { FaCheck } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import DropdownOptions from "./DropdownOptions";

const Task = ({
  task,
  startTask,
  toggleComplete,
  deleteTask,
  active,
  toggleEdit,
}) => {
  const [openOptions, setOpenOptions] = useState(false);

  return (
    <div onClick={() => startTask(task.id)} className={active ? "task active" : "task"}>
      <div className="task-left">
        <Button
          className={"check-button"}
          onClick={() => toggleComplete(task.id)}
          text={task.completed ? <FaCheck className="check-icon" /> : ""}
        />
        <p className={task.completed ? "task-name completed" : "task-name"}>
          {task.taskName}
        </p>
      </div>
      <div className="task-right">
        <p className="pomodoros">
          {task.completedPomodoros}/{task.pomodoros}
        </p>
        <Button
          onClick={() => setOpenOptions((prev) => !prev)}
          text={<BsThreeDotsVertical />}
          className={"options-button"}
        />
        {openOptions && (
          <DropdownOptions
            task={task}
            deleteTask={deleteTask}
            toggleEdit={toggleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Task;
