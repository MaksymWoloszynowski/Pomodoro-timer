import { useEffect, useState } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedActiveTask = localStorage.getItem("activeTask");

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedActiveTask) setActiveTaskId(Number(savedActiveTask));
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const saveTaskId = (taskId) => {
    setActiveTaskId(taskId);
    localStorage.setItem("activeTask", taskId);
  };

  const addTask = (taskName, pomodoros) => {
    const newTask = {
      id: Date.now(),
      taskName,
      completed: false,
      pomodoros,
      completedPomodoros: 0,
      isEditing: false,
    };
    saveTasks([...tasks, newTask]);
    if (tasks.length === 0) saveTaskId(newTask.id);
  };

  const deleteTask = (taskId) => {
    if (taskId === activeTaskId) saveTaskId(null);
    saveTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleEdit = (taskId) =>
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
      )
    );

  const editTask = (taskName, pomodoros, taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const completed = task.completedPomodoros >= pomodoros;
        if (!completed) saveTaskId(taskId);
        return { ...task, taskName, pomodoros, completed, isEditing: false };
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

  return {
    tasks,
    activeTaskId,
    addTask,
    deleteTask,
    toggleEdit,
    editTask,
    toggleComplete,
    saveTaskId,
    setTasks,
  };
};

export default useTasks;
