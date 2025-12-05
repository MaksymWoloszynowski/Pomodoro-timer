import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

const EditTask = ({ task, editTask }) => {
  const [taskName, setTaskName] = useState(task.taskName);
  const [pomodoros, setPomodoros] = useState(task.pomodoros);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(taskName, pomodoros, task.id);
  };

  const handleCancel = () => {
    editTask(task.taskName, task.pomodoros, task.id);
  }

  const handlePomodorosChange = (action) => {
    setPomodoros((prev) => {
      if (action === "up") return prev + 1;
      if (action === "down") return Math.max(1, prev - 1);
      return prev;
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
          <div className="task-form-field">
            <input
              type="text"
              className="task-form-input"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name..."
              autoFocus
            />
          </div>
    
          <div className="task-form-field">
            <p className="estimated">Pomodoros</p>
            <div className="pomodoros-wrapper">
              <input
                type="number"
                min={1}
                className="number-input"
                value={pomodoros}
                onChange={(e) => setPomodoros(Number(e.target.value))}
              />
              <div className="arrows-wrapper">
                <div className="arrow" onClick={() => handlePomodorosChange("up")}>
                  <FaArrowUp />
                </div>
                <div
                  className="arrow"
                  onClick={() => handlePomodorosChange("down")}
                >
                  <FaArrowDown />
                </div>
              </div>
            </div>
          </div>
    
          <div className="task-form-buttons">
            <button type="submit" className="button-save">
              Save
            </button>
    
            <button type="button" onClick={handleCancel} className="button-cancel">
              Cancel
            </button>
          </div>
        </form>
  );
};

export default EditTask;
