import TaskForm from "./TaskForm";
import Task from "./Task";
import { useContext, useEffect, useState } from "react";
import { TimerContext } from "@/context/TimerContext";
import EditTask from "./EditTask";

const TasksPage = () => {
  const { mode, timeLeft } = useContext(TimerContext);
  const [tasks, setTasks] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const savedActiveTask = localStorage.getItem("activeTask");

    if (savedActiveTask) setActiveTaskId(Number(savedActiveTask));
  }, []);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const startTask = (taskId) => {
    setActiveTaskId(taskId);
    localStorage.setItem("activeTask", taskId);
  };

  const addTask = (taskName, pomodoros) => {
    const newTask = {
      id: Date.now(),
      taskName,
      completed: false,
      pomodoros: pomodoros,
      completedPomodoros: 0,
      isEditing: false,
    };

    saveTasks([...tasks, newTask]);

    if (tasks.length === 0) startTask(newTask.id);
  };

  const deleteTask = (taskId) => {
    saveTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleEdit = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const editTask = (taskName, pomodoros, taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const completed = task.completedPomodoros >= pomodoros;
        if (!completed) {
          startTask(taskId)
        }
        return {
          ...task,
          taskName,
          pomodoros,
          completed,
          isEditing: false,
        };
      }
      return task;
    });

    saveTasks(newTasks);
  };

  const toggleComplete = (taskId) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    saveTasks(newTasks);
  };

  useEffect(() => {
    if (timeLeft === 0 && mode === "work" && activeTaskId) {
      const newTasks = tasks.map((task) => {
        if (task.id === activeTaskId) {
          const updatedPomodoros = Math.min(
            task.completedPomodoros + 1,
            task.pomodoros
          );

          return {
            ...task,
            completedPomodoros: updatedPomodoros,
            completed: updatedPomodoros >= task.pomodoros,
          };
        }
        return task;
      });
      saveTasks(newTasks);
    }

    if (tasks.length === 0) return;

    const unfinishedTasks = tasks.filter((task) => !task.completed);

    if (unfinishedTasks.length === 0) {
      console.log("koniec");
      startTask(null);
    } else {
      startTask(unfinishedTasks[0].id);
    }
  }, [timeLeft, mode, activeTaskId]);

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
          <EditTask key={task.id} editTask={editTask} task={task}></EditTask>
        ) : (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            startTask={startTask}
            active={task.id === activeTaskId}
            toggleEdit={toggleEdit}
          />
        )
      )}
    </div>
  );
};

export default TasksPage;
