import { useState } from "react";

const TaskForm = ({ addTask, setIsButtonVisible, setIsFormVisible }) => {
  const [value, setValue] = useState("");
  const [pomodoros, setPomodoros] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value) {
      addTask(value, pomodoros);
      setValue("");
    }

    setIsButtonVisible(true)
    setIsFormVisible(false)
  };

  const handleCancel = () => {
    setIsButtonVisible(true)
    setIsFormVisible(false)
  }

  return (
    <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder=""
        />
      <label>
        Estimated pomodoros
        <input
          type="number"
          min={1}
          value={pomodoros}
          onChange={(e) => setPomodoros(Number(e.target.value))}
        />
      </label>

      <button type="submit" className="todo-btn">
        Save
      </button>
      <button type="button" onClick={handleCancel} className="todo-btn">
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;
