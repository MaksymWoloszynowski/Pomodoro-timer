"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const TasksDetailsContext = createContext();

export const TasksDetailsProvider = ({ children }) => {
    const [tasksDetails, setTasksDetails] = useState([]);

  useEffect(() => {
    const savedTasksDetails = localStorage.getItem("tasksDetails");
    if (savedTasksDetails) setTasksDetails(JSON.parse(savedTasksDetails));
  }, []);

  const getFullDate = () => new Date().toLocaleDateString("en-CA");

  const saveTasksDetails = (taskId, taskName) => {
    setTasksDetails((prev) => {
      const index = prev.findIndex(
        (d) => d.id === taskId && d.date === getFullDate()
      );

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          timeSpent: updated[index].timeSpent + 1,
        };
        return updated;
      }
      
      return [
          ...prev,
          {
              id: taskId,
              date: getFullDate(),
              taskName,
              timeSpent: 1,
            },
        ];
    });
};

useEffect(() => {
      localStorage.setItem("tasksDetails", JSON.stringify(tasksDetails));
  }, [tasksDetails]);

  const getMinutesFocused = () =>
    tasksDetails.reduce((acc, curr) => acc + curr.timeSpent, 0);

  return (
      <TasksDetailsContext.Provider
        value={{
          tasksDetails, 
          getMinutesFocused,
          saveTasksDetails
        }}
      >
        {children}
      </TasksDetailsContext.Provider>
    );
  }
