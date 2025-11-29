import { useState } from "react";

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

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Update task"
      />
      <input
        type="number"
        value={pomodoros}
        min={1}
        onChange={(e) => setPomodoros(e.target.value)}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditTask;
