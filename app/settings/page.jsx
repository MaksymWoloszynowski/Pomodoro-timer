"use client";

import NavBar from "@/components/NavBar";
import SoundSelect from "@/components/SoundSelect";
import VolumeSlider from "@/components/VolumeSlider";
import ColorTheme from "@/components/ColorTheme";

import { SettingsContext } from "@/context/SettingsContext";
import { useContext, useEffect, useState } from "react";

const SettingsPage = () => {
  const {
    workMinutes,
    breakMinutes,
    setWorkMinutes,
    setBreakMinutes,
  } = useContext(SettingsContext);

  const [workTime, setWorkTime] = useState(workMinutes);
  const [breakTime, setBreakTime] = useState(breakMinutes);

  const handleSubmit = (e) => {
    e.preventDefault();

    setWorkMinutes(Number(workTime));
    setBreakMinutes(Number(breakTime));
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="settings-wrapper">
        <div className="settings-section timer-section">
          <p className="settings-section-title">Timer</p>
          <form onSubmit={handleSubmit}>
            <input
              className="timer-input"
              type="number"
              value={workTime}
              onChange={(e) => setWorkTime(e.target.value)}
            />
            <input
              className="timer-input"
              type="number"
              value={breakTime}
              onChange={(e) => setBreakTime(e.target.value)}
            />
            <button type="submit" className="timer-save-btn">
              Save
            </button>
          </form>
        </div>
        <div className="settings-section theme-section">
          <p className="settings-section-title">Theme</p>
          <ColorTheme />
        </div>
        <div className="settings-section sound-section">
          <p className="settings-section-title">Sound</p>
          <SoundSelect className={"sound-select"}/>
          <VolumeSlider />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
