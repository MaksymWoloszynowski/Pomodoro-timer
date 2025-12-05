"use client";

import NavBar from "@/components/NavBar";
import Button from "@/components/Button";
import StatsList from "@/components/StatsList";
import useTasksDetails from "@/hooks/useTasksDetails";
import { useState } from "react";

const StatsPage = () => {
  const {
    tasksDetails,
    getMinutesFocused,
  } = useTasksDetails();
  const [statsFormat, setStatsFormat] = useState("day");

  return (
    <div>
      <NavBar></NavBar>
      <div>
        <Button text="day" onClick={() => setStatsFormat("day")} />
        <Button text="month" onClick={() => setStatsFormat("month")} />
        <Button text="year" onClick={() => setStatsFormat("year")} />
      </div>
      <div className="">
          <StatsList stats={tasksDetails} />
      </div>
    </div>
  );
};

export default StatsPage;
