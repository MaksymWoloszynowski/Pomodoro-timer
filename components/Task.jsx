import Button from "./Button";

const Task = ({ task, startTask, toggleComplete, deleteTask, active, toggleEdit }) => {
  
  return (
    <div style={{ padding: 8, border: "1px solid #ddd", marginBottom: 8, background: active ? "#eef" : "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <strong style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.taskName}</strong>
          <div style={{ fontSize: 12, color: "#666" }}>
            {task.completedPomodoros}/{task.pomodoros}
          </div>
        </div>

        <div>
          <Button onClick={() => startTask(task.id)} text={active ? "Active" : "Start"}/>
          <Button onClick={() => toggleComplete(task.id)} text={task.completed ? "Undo" : "Done"}/>
          <Button onClick={() => deleteTask(task.id)} text={"Delete"}/>
          <Button onClick={() => toggleEdit(task.id)} text={"Edit"}/>
        </div>
      </div>
    </div>
  );
};

export default Task;

