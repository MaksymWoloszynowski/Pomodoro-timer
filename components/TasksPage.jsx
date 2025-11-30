import TaskForm from "./TaskForm";
import Task from "./Task";
import { useContext, useEffect, useState } from "react";
import { TimerContext } from "@/context/TimerContext";
import EditTask from "./EditTask";

const TasksPage = () => {
  const { mode, timeLeft, isActive, playTimer } = useContext(TimerContext);
  const [tasks, setTasks] = useState([]);
  const [tasksDetails, setTasksDetails] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  useEffect(() => {
    const savedActiveTask = localStorage.getItem("activeTask");
    const savedTasks = localStorage.getItem("tasks");
    const savedTasksDetails = localStorage.getItem("tasksDetails");

    if (savedActiveTask) setActiveTaskId(Number(savedActiveTask));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedTasksDetails) setTasksDetails(JSON.parse(savedTasksDetails));
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const saveTaskId = (taskId) => {
    setActiveTaskId(taskId);
    localStorage.setItem("activeTask", taskId);
  };

  const saveTasksDetails = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return

    setTasksDetails((prev) => {
      const prevTaskDetails = prev.find(
        (detail) => detail.id === taskId && detail.date === getFullDate()
      );

      let updated;

      if (prevTaskDetails) {
        updated = prev.map((detail) =>
          detail.id === taskId && detail.date === getFullDate()
            ? { ...detail, timeSpent: detail.timeSpent + 1 }
            : detail
        );
      } else {
        const newDetail = {
          id: taskId,
          date: getFullDate(),
          taskName: task.taskName,
          timeSpent: 0,
        };

        updated = [...prev, newDetail];
      }

      localStorage.setItem("tasksDetails", JSON.stringify(updated));
      return updated;
    });
  };

  const startTask = (taskId) => {
    if (isActive) {
      alert("you are switching tasks");
    }

    saveTaskId(taskId);
    playTimer();
  };

  const getFullDate = () => {
    const date = new Date().toLocaleDateString("pl-PL");
    const formattedDate = date.replaceAll(".", "-");

    return formattedDate;
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

    if (tasks.length === 0) saveTaskId(newTask.id);
  };

  const deleteTask = (taskId) => {
    if (taskId === activeTaskId) saveTaskId(null);
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
          saveTaskId(taskId);
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
    if (isActive && activeTaskId) {
      saveTasksDetails(activeTaskId);
    }
  }, [isActive]);

  useEffect(() => {
    if (!activeTaskId) return;
    if (mode === "break") return;
    if (!isActive) return;

    saveTasksDetails(activeTaskId);
  }, [timeLeft]);

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
      saveTaskId(null);
    } else if (!unfinishedTasks.some((task) => task.id === activeTaskId)) {
      saveTaskId(unfinishedTasks[0].id);
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
