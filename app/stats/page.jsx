"use client";

import NavBar from "@/components/NavBar";
import Button from "@/components/Button";
import StatsList from "@/components/StatsList";
import StatsChart from "@/components/StatsChart";

import { useContext, useState } from "react";
import useVisitedDays from "@/hooks/useVisitedDays";

import { groupByDay, groupByMonth } from "@/hooks/useStatsTransform";

import { FaCalendar, FaClock } from "react-icons/fa";
import { TasksDetailsContext } from "@/context/TasksDetailsContext";

const StatsPage = () => {
  const { tasksDetails, getMinutesFocused } = useContext(TasksDetailsContext);
  const { daysCount } = useVisitedDays();

  const [statsFormat, setStatsFormat] = useState("day");

  const today = new Date();
  const initialWeekStart = new Date(today);
  initialWeekStart.setDate(today.getDate() - today.getDay() + 1);

  const [weekStart, setWeekStart] = useState(initialWeekStart);

  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const getData = () => {
    switch (statsFormat) {
      case "day":
        return groupByDay(tasksDetails, weekStart);

      case "month":
        return groupByMonth(tasksDetails, selectedYear);

      default:
        return [];
    }
  };

  const data = getData();

  const goPrev = () => {
    if (statsFormat === "day") {
      const newStart = new Date(weekStart);
      newStart.setDate(newStart.getDate() - 7);
      setWeekStart(newStart);
    }

    if (statsFormat === "month") {
      setSelectedYear((prev) => prev - 1);
    }
  };

  const goNext = () => {
    if (statsFormat === "day") {
      const newStart = new Date(weekStart);
      newStart.setDate(newStart.getDate() + 7);
      setWeekStart(newStart);
    }

    if (statsFormat === "month") {
      setSelectedYear((prev) => prev + 1);
    }
  };

  return (
    <div>
      <NavBar />

      <h1>Your stats</h1>
      <div className="stats-wrapper">
        <div className="stats-summary">
          <div className="stats-summary-item">
            <p className="stats-summary-label">
              <FaCalendar />
              Days visited
            </p>
            <p className="stats-summary-value">{daysCount}</p>
          </div>
          <div className="stats-summary-item">
            <p className="stats-summary-label">
              <FaClock />
              Minutes focused
            </p>
            <p className="stats-summary-value">{getMinutesFocused()}</p>
          </div>
        </div>

        <div className="stats-format">
          <p className="stats-format-title">Change format</p>
          <div className="stats-format-buttons">
            <Button
              className={statsFormat === "day" ? "active" : ""}
              text="Day"
              onClick={() => setStatsFormat("day")}
            />
            <Button
              className={statsFormat === "month" ? "active" : ""}
              text="Month"
              onClick={() => setStatsFormat("month")}
            />
          </div>
        </div>

        <div className="stats-chart">
          <p className="stats-chart-title">Focus Time</p>
          <StatsChart data={data} />
          <div className="stats-nav-buttons">
            <Button text="<" onClick={goPrev} />
            <Button text=">" onClick={goNext} />
          </div>
        </div>

        <div className="stats-list">
          <StatsList stats={tasksDetails} />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
