import { SettingsContext } from "@/context/SettingsContext";
import React, { useContext, useEffect } from "react";

const pomodoroColors = ["1", "2", "3"];
const breakColors = ["1", "2", "3"];

const ColorTheme = () => {
  const { setWorkTheme, setBreakTheme } = useContext(SettingsContext);

  const handlePomodoroClick = (idx) => {
    const newTheme = `pomodoro-${idx + 1}`
    setWorkTheme(newTheme);
    localStorage.setItem("workTheme", newTheme)
  };

  const handleBreakClick = (idx) => {
    const newTheme = `break-${idx + 1}`
    setBreakTheme(`break-${idx + 1}`);
    localStorage.setItem("breakTheme", newTheme)
  };

  return (
    <div className="color-theme">
      <div className="color-section">
        <p>Pomodoro color</p>
        <div className="boxes">
          {pomodoroColors.map((_, idx) => (
            <div
              key={idx}
              className={`box pomodoro-${idx + 1}`}
              onClick={() => handlePomodoroClick(idx)}
            ></div>
          ))}
        </div>
      </div>

      <div className="color-section">
        <p>Break color</p>
        <div className="boxes">
          {breakColors.map((_, idx) => (
            <div
              key={idx}
              className={`box break-${idx + 1}`}
              onClick={() => handleBreakClick(idx)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorTheme;
