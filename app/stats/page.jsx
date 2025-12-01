"use client";

import NavBar from "@/components/NavBar";
import useTasksDetails from "@/hooks/useTasksDetails";
import { useEffect, useState } from "react";

const StatsPage = () => {
  const { tasksDetails, getDailyTasks, getMonthlyTasks, getYearlyTasks } = useTasksDetails();

  console.log(getDailyTasks())
  console.log(getMonthlyTasks())
  console.log(getYearlyTasks())

  return (
    <div>
      <NavBar></NavBar>
    </div>
  );
};

export default StatsPage;
