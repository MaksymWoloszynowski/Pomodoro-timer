import { act, useContext, useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import Task from "@/components/Task";
import EditTask from "@/components/EditTask";
import Button from "./Button";
import { TimerContext } from "@/context/TimerContext";
import useTasks from "@/hooks/useTasks";
import useTasksDetails from "@/hooks/useTasksDetails";

const TasksPage = () => {
  const { mode, timeLeft, isActive, playTimer } = useContext(TimerContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const {
    tasks,
    activeTaskId,
    activeTask,
    addTask,
    deleteTask,
    toggleEdit,
    editTask,
    toggleComplete,
    saveTaskId,
    saveTasks,
  } = useTasks();

  const { saveTasksDetails } = useTasksDetails();

  const startTask = (taskId, taskName) => {
    if (isActive) alert("you are switching tasks");
    saveTaskId(taskId);
    playTimer();
    saveTasksDetails(taskId, taskName);
  };

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
    <div className="tasks-container">
      <p className="active-task">Active task: {activeTask}</p>
      <p className="tasks-count">Tasks: {tasks.length}</p>
      <div className="tasks-list">
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
      {isButtonVisible && (
        <Button
          className={"add-task-button"}
          onClick={() => {
            setIsFormVisible(true);
            setIsButtonVisible(false);
            setTimeout(() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }, 50);
          }}
          text={"+ Add task"}
        />
      )}

      {isFormVisible && (
        <TaskForm
          addTask={addTask}
          startTask={startTask}
          setIsButtonVisible={setIsButtonVisible}
          setIsFormVisible={setIsFormVisible}
        />
      )}
    </div>
  );
};

export default TasksPage;
