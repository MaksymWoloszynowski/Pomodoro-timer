// TimerContext.js
'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { SettingsContext } from "@/context/SettingsContext";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const { workMinutes, breakMinutes } = useContext(SettingsContext);

  const [mode, setMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(workMinutes);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(workMinutes);
  }, [workMinutes]);

  const playTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setMode("work");
    setTimeLeft(workMinutes);
  };

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          const newMode = mode === "work" ? "break" : "work";
          const newTime = newMode === "work" ? workMinutes : breakMinutes;
          setMode(newMode);
          return newTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, mode, workMinutes, breakMinutes]);

  return (
    <TimerContext.Provider value={{ mode, timeLeft, isActive, playTimer, pauseTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
