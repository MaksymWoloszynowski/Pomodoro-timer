import { SettingsContext } from "@/context/SettingsContext";
import React, { useContext, useEffect, useRef } from "react";

const SoundSelect = () => {
  const { alarmSound, alarmVolume, setAlarmSound } = useContext(SettingsContext);
  const audioRef = useRef(null);

  const handleChange = (e) => {
    const sound = e.target.value;
    if (audioRef.current) {
        audioRef.current.pause()
    }

    const audio = new Audio(`/sounds/${sound}.mp3`)
    audio.volume = alarmVolume / 100;
    audio.play()
    audioRef.current = audio

    setAlarmSound(sound)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = alarmVolume / 100;
    }
  }, [alarmVolume]);

  return (
    <select
      value={alarmSound}
      className="sound-select"
      onChange={handleChange}
    >
      <option value="bell">Bell</option>
      <option value="digital">Digital</option>
      <option value="cuckoo">Cuckoo</option>
    </select>
  );
};

export default SoundSelect;
