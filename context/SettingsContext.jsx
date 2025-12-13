"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { TimerContext } from "./TimerContext";

const pomodoroColors = ["1", "2", "3"];
const breakColors = ["1", "2", "3"];

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [workMinutes, setWorkMinutes] = useState(5);
  const [breakMinutes, setBreakMinutes] = useState(15);
  const [workTheme, setWorkTheme] = useState("pomodoro-1");
  const [breakTheme, setBreakTheme] = useState("break-1");
  const [alarmSound, setAlarmSound] = useState("bell");
  const [alarmVolume, setAlarmVolume] = useState(50);

  useEffect(() => {
    const savedWorkMinutes = localStorage.getItem("workMinutes");
    const savedBreakMinutes = localStorage.getItem("breakMinutes");
    const savedWorkTheme = localStorage.getItem("workTheme");
    const savedBreakTheme = localStorage.getItem("breakTheme");

    if (savedWorkMinutes) setWorkMinutes(Number(savedWorkMinutes));
    if (savedBreakMinutes) setBreakMinutes(Number(savedBreakMinutes));
    if (savedWorkTheme) setWorkTheme(savedWorkTheme);
    if (savedBreakTheme) setBreakTheme(savedBreakTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("workMinutes", workMinutes);
  }, [workMinutes]);

  useEffect(() => {
    localStorage.setItem("breakMinutes", breakMinutes);
  }, [breakMinutes]);

  useEffect(() => {
    const classes = [
      ...pomodoroColors.map((_, i) => `pomodoro-${i + 1}`),
      ...breakColors.map((_, i) => `break-${i + 1}`),
    ];

    document.body.classList.remove(...classes);

    if (workTheme) document.body.classList.add(workTheme);
    if (breakTheme) document.body.classList.add(breakTheme);
  }, [workTheme, breakTheme]);

  return (
    <SettingsContext.Provider
      value={{
        workMinutes,
        breakMinutes,
        workTheme,
        breakTheme,
        alarmSound,
        alarmVolume,
        setWorkMinutes,
        setBreakMinutes,
        setWorkTheme,
        setBreakTheme,
        setAlarmSound,
        setAlarmVolume,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
