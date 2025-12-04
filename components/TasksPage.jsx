import { useContext, useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import Task from "@/components/Task";
import EditTask from "@/components/EditTask";
import { TimerContext } from "@/context/TimerContext";
import useTasks from "@/hooks/useTasks";
import useTasksDetails from "@/hooks/useTasksDetails";

import "@/styles/task.css";

const TasksPage = () => {
  const { mode, timeLeft, isActive, playTimer } = useContext(TimerContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const {
    tasks,
    activeTaskId,
    addTask,
    deleteTask,
    toggleEdit,
    editTask,
    toggleComplete,
    saveTaskId,
    setTasks,
  } = useTasks();

  const { saveTasksDetails } = useTasksDetails();

  const startTask = (taskId, taskName) => {
    if (isActive) alert("you are switching tasks");
    saveTaskId(taskId);
    playTimer();
    saveTasksDetails(taskId, taskName);
  };

  // Aktualizacja szczegółów w zależności od czasu i aktywności
  useEffect(() => {
    if (isActive && activeTaskId) saveTasksDetails(activeTaskId);
  }, [isActive, activeTaskId]);

  useEffect(() => {
    if (!activeTaskId || mode === "break" || !isActive) return;
    saveTasksDetails(activeTaskId);
  }, [timeLeft]);

  return (
    <div>
      {isButtonVisible && (
        <button
          onClick={() => {
            setIsFormVisible(true);
            setIsButtonVisible(false);
          }}
        >
          + Add task
        </button>
      )}

      {isFormVisible && (
        <TaskForm
          addTask={addTask}
          startTask={startTask}
          setIsButtonVisible={setIsButtonVisible}
          setIsFormVisible={setIsFormVisible}
        />
      )}

      {tasks.map((task) =>
        task.isEditing ? (
          <EditTask key={task.id} editTask={editTask} task={task} />
        ) : (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            startTask={() => startTask(task.id, task.taskName)}
            active={task.id === activeTaskId}
            toggleEdit={toggleEdit}
          />
        )
      )}
    </div>
  );
};

export default TasksPage;
