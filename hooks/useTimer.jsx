'use client'

import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "@/context/SettingsContext";

const useTimer = () => {
  const { workMinutes, breakMinutes } = useContext(SettingsContext);

  const [mode, setMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(workMinutes);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const savedWorkMinutes = localStorage.getItem("workMinutes");
    if (savedWorkMinutes) setTimeLeft(Number(savedWorkMinutes));
  }, []);

  const playTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    const savedWorkMinutes = localStorage.getItem("workMinutes");
    if (savedWorkMinutes) setTimeLeft(Number(savedWorkMinutes));
    else setTimeLeft(workMinutes);
    setMode("work");
  };

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
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

  return {
    mode,
    timeLeft,
    isActive,
    playTimer,
    pauseTimer,
    resetTimer,
  };
};

export default useTimer;
