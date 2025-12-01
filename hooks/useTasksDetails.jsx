import React, { useEffect, useState } from "react";

const useTasksDetails = () => {
  const [tasksDetails, setTasksDetails] = useState([]);

  useEffect(() => {
    const savedTasksDetails = localStorage.getItem("tasksDetails");

    if (savedTasksDetails) setTasksDetails(JSON.parse(savedTasksDetails));
  }, []);

  const groupData = (param) => {
    return tasksDetails.reduce((acc, curr) => {
      let criteria
      if (param === "day") {
        criteria = curr.fullDate
      } else if (param === "month") {
        criteria = `${curr.month}-${curr.year}`
      } else if (param === "year") {
        criteria = curr.year
      }
      
      if (!acc[criteria]) {
          acc[criteria] = [];
        }

        acc[criteria].push(curr);

      return acc;
    }, {});
  };

  const getDailyTasks = () => {
    return groupData("day")
  }

  const getMonthlyTasks = () => {
    return groupData("month")
  }

  const getYearlyTasks = () => {
    return groupData("year")
  }

  return {
    tasksDetails,
    getDailyTasks,
    getMonthlyTasks,
    getYearlyTasks
  };
};

export default useTasksDetails;
