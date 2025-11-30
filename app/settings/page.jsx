"use client";

import NavBar from "@/components/NavBar";

import { SettingsContext } from "@/context/SettingsContext";
import { useContext, useEffect, useState } from "react";

const SettingsPage = () => {
  const {
    workMinutes,
    breakMinutes,
    theme,
    setWorkMinutes,
    setBreakMinutes,
    setTheme,
  } = useContext(SettingsContext);

  const [workTime, setWorkTime] = useState(workMinutes);
  const [breakTime, setBreakTime] = useState(breakMinutes);
  //   const [theme, setTheme] = useState(theme)

  const handleSubmit = (e) => {
    e.preventDefault();

    setWorkMinutes(Number(workTime));
    setBreakMinutes(Number(breakTime));

    console.log("changed");
  };

  return (
    <div>
      <NavBar></NavBar>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={workTime}
          onChange={(e) => setWorkTime(e.target.value)}
        />
        <input
          type="number"
          value={breakTime}
          onChange={(e) => setBreakTime(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SettingsPage;
