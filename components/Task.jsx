import Button from "@/components/Button";
import useTasks from "@/hooks/useTasks";
import { FaCheck } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import DropdownOptions from "./DropdownOptions";

const Task = ({
  task,
  saveTaskId,
  toggleComplete,
  deleteTask,
  active,
  toggleEdit,
}) => {
  const [openOptions, setOpenOptions] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!openOptions) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openOptions]);

  return (
    <div
      onClick={saveTaskId}
      className={active ? "task active" : "task"}
    >
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
          onClick={(e) => {
            e.stopPropagation();
            setOpenOptions((prev) => !prev);
          }}
          text={<BsThreeDotsVertical />}
          className={"options-button"}
        />
        {openOptions && (
          <DropdownOptions
            task={task}
            deleteTask={deleteTask}
            toggleEdit={toggleEdit}
            dropdownRef={dropdownRef}
          />
        )}
      </div>
    </div>
  );
};

export default Task;
