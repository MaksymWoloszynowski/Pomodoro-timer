import { SettingsContext } from "@/context/SettingsContext";
import { useContext, useEffect, useState } from "react";

const Settings = () => {
  const {
    workMinutes,
    breakMinutes,
    theme,
    setWorkMinutes,
    setBreakMinutes,
    setTheme,
  } = useContext(SettingsContext);

  const [workTime, setWorkTime] = useState(workMinutes)
  const [breakTime, setBreakTime] = useState(breakMinutes)
//   const [theme, setTheme] = useState(theme)

  const handleSubmit = (e) => {
    e.preventDefault()

    setWorkMinutes(Number(workTime))
    setBreakMinutes(Number(breakTime))

    console.log("changed")
  }


  return <form onSubmit={handleSubmit}>

    <input type="number" value={workTime} onChange={(e) => setWorkTime(e.target.value)} />
    <input type="number" value={breakTime} onChange={(e) => setBreakTime(e.target.value)} />
    <button type="submit">Save</button>
  </form>;
};

export default Settings;
