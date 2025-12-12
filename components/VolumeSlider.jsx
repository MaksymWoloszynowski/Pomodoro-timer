import { SettingsContext } from "@/context/SettingsContext";
import { useContext, useState } from "react";

const VolumeSlider = () => {
  const { alarmVolume, setAlarmVolume } = useContext(SettingsContext);

  return (
    <div className="volume-slider">
      <p style={{fontSize: "1rem"}}>Volume: </p>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={alarmVolume}
        onChange={(e) => setAlarmVolume(Number(e.target.value))}
      />
      <p>{alarmVolume}%</p>
    </div>
  );
};

export default VolumeSlider;
