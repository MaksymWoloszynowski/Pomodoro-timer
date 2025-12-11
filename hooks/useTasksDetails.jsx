import { useEffect, useState } from "react";

const useTasksDetails = () => {
  const [tasksDetails, setTasksDetails] = useState([]);

  useEffect(() => {
    const savedTasksDetails = localStorage.getItem("tasksDetails");
    if (savedTasksDetails) setTasksDetails(JSON.parse(savedTasksDetails));
  }, []);

  const getFullDate = () =>
    new Date().toLocaleDateString('en-CA'); 

  const saveTasksDetails = (taskId, taskName) => {
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
          taskName,
          timeSpent: 0,
        };
        updated = [...prev, newDetail];
      }

      localStorage.setItem("tasksDetails", JSON.stringify(updated));
      return updated;
    });
  };

  const getMinutesFocused = () =>
    tasksDetails.reduce((acc, curr) => acc + curr.timeSpent, 0);

  return { tasksDetails, saveTasksDetails, getMinutesFocused };
};

export default useTasksDetails;
